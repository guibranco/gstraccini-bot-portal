import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildIngestUrl,
  installGlobalErrorHandlers,
  Logger,
  resetGlobalErrorHandlersForTests,
  serializeError,
} from "../../src/utils/logger";

type FetchMock = ReturnType<typeof vi.fn<typeof fetch>>;

const okResponse = () => Promise.resolve(new Response(null, { status: 201 }));

function createLogger(overrides = {}) {
  const fetchFn: FetchMock = vi.fn<typeof fetch>(okResponse);
  const logger = new Logger({
    server: "https://logs.example.com/",
    apiKey: "gstraccini-bot-portal",
    apiToken: "lss_token",
    appId: "1.2.3",
    batchSize: 3,
    flushIntervalMs: 1000,
    maxQueueSize: 5,
    fetchFn,
    ...overrides,
  });
  return { logger, fetchFn };
}

function sentInit(fetchFn: FetchMock, call = 0): RequestInit {
  return fetchFn.mock.calls[call][1] as RequestInit;
}

function sentBody(fetchFn: FetchMock, call = 0) {
  return JSON.parse(sentInit(fetchFn, call).body as string);
}

describe("buildIngestUrl", () => {
  it("appends /api/logs to the server root", () => {
    expect(buildIngestUrl("https://logs.example.com")).toBe(
      "https://logs.example.com/api/logs",
    );
    expect(buildIngestUrl(" https://logs.example.com// ")).toBe(
      "https://logs.example.com/api/logs",
    );
  });

  it("keeps a URL that already points to /api/logs", () => {
    expect(buildIngestUrl("https://logs.example.com/api/logs/")).toBe(
      "https://logs.example.com/api/logs",
    );
  });
});

describe("serializeError", () => {
  it("serializes Error instances", () => {
    const result = serializeError(new TypeError("boom"));
    expect(result.error_name).toBe("TypeError");
    expect(result.error_message).toBe("boom");
    expect(result.stack).toBeTypeOf("string");
  });

  it("serializes non-Error values", () => {
    expect(serializeError("plain")).toEqual({ error_message: "plain" });
  });
});

describe("Logger", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("is disabled when any credential is missing", () => {
    for (const missing of ["server", "apiKey", "apiToken"]) {
      const { logger, fetchFn } = createLogger({ [missing]: "" });
      logger.error("ignored");
      expect(logger.enabled).toBe(false);
      expect(logger.pending).toBe(0);
      expect(fetchFn).not.toHaveBeenCalled();
    }
  });

  it("sends a batch with the per-client auth headers and the version as app_id", async () => {
    const { logger, fetchFn } = createLogger();
    logger.info("hello", { foo: "bar" }, "tests");
    await logger.flush();

    expect(fetchFn).toHaveBeenCalledTimes(1);
    const url = fetchFn.mock.calls[0][0];
    const init = sentInit(fetchFn);
    expect(url).toBe("https://logs.example.com/api/logs");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({
      "X-Api-Key": "gstraccini-bot-portal",
      "X-Api-Token": "lss_token",
    });

    const body = sentBody(fetchFn);
    expect(body.app_id).toBe("1.2.3");
    expect(body.logs).toHaveLength(1);
    expect(body.logs[0]).toMatchObject({
      level: "info",
      category: "tests",
      message: "hello",
      context: { foo: "bar" },
    });
    expect(body.logs[0].trace_id).toBeTypeOf("string");
    expect(logger.pending).toBe(0);
  });

  it("defaults app_id to dev and category to portal", async () => {
    const { logger, fetchFn } = createLogger({ appId: undefined });
    logger.warning("w");
    await logger.flush();
    const body = sentBody(fetchFn);
    expect(body.app_id).toBe("dev");
    expect(body.logs[0].category).toBe("portal");
    expect(body.logs[0].level).toBe("warning");
  });

  it("flushes automatically after the interval", async () => {
    const { logger, fetchFn } = createLogger();
    logger.debug("later");
    expect(fetchFn).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1000);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("flushes immediately when the batch is full", async () => {
    const { logger, fetchFn } = createLogger();
    logger.info("1");
    logger.info("2");
    logger.critical("3");
    await vi.waitFor(() => expect(fetchFn).toHaveBeenCalledTimes(1));
    expect(sentBody(fetchFn).logs).toHaveLength(3);
  });

  it("keeps entries and retries when the server is unreachable", async () => {
    const { logger, fetchFn } = createLogger();
    fetchFn.mockImplementationOnce(() => Promise.reject(new Error("offline")));
    logger.error("keep me");
    await logger.flush();
    expect(logger.pending).toBe(1);

    await vi.advanceTimersByTimeAsync(1000);
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(logger.pending).toBe(0);
  });

  it("retries on 5xx but drops the batch on 4xx", async () => {
    const { logger, fetchFn } = createLogger();
    fetchFn.mockImplementationOnce(() =>
      Promise.resolve(new Response(null, { status: 503 })),
    );
    logger.info("a");
    await logger.flush();
    expect(logger.pending).toBe(1);

    fetchFn.mockImplementationOnce(() =>
      Promise.resolve(new Response(null, { status: 401 })),
    );
    await logger.flush();
    expect(logger.pending).toBe(0);
  });

  it("drops the oldest entries beyond the max queue size", async () => {
    const { logger, fetchFn } = createLogger({ batchSize: 100 });
    for (let i = 0; i < 8; i++) {
      logger.info(`m${i}`);
    }
    expect(logger.pending).toBe(5);
    await logger.flush();
    expect(
      sentBody(fetchFn).logs.map((l: { message: string }) => l.message),
    ).toEqual(["m3", "m4", "m5", "m6", "m7"]);
  });

  it("passes keepalive through when flushing on page hide", async () => {
    const { logger, fetchFn } = createLogger();
    logger.info("bye");
    await logger.flush(true);
    expect(sentInit(fetchFn).keepalive).toBe(true);
  });
});

describe("installGlobalErrorHandlers", () => {
  afterEach(() => {
    resetGlobalErrorHandlersForTests();
  });

  it("does nothing for a disabled logger", () => {
    const { logger } = createLogger({ server: "" });
    const spy = vi.spyOn(window, "addEventListener");
    installGlobalErrorHandlers(logger);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("logs uncaught errors and unhandled rejections", () => {
    const { logger } = createLogger({ batchSize: 100 });
    const errorSpy = vi.spyOn(logger, "error");
    installGlobalErrorHandlers(logger);

    window.dispatchEvent(
      new ErrorEvent("error", {
        message: "kaboom",
        error: new Error("kaboom"),
        filename: "app.js",
        lineno: 1,
        colno: 2,
      }),
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "kaboom",
      expect.objectContaining({ error_message: "kaboom", source: "app.js" }),
      "uncaught-error",
    );

    const rejection = new Event("unhandledrejection") as PromiseRejectionEvent;
    Object.defineProperty(rejection, "reason", { value: "nope" });
    window.dispatchEvent(rejection);
    expect(errorSpy).toHaveBeenCalledWith(
      "Unhandled promise rejection",
      { error_message: "nope" },
      "unhandled-rejection",
    );
  });

  it("flushes with keepalive when the page is hidden", () => {
    const { logger } = createLogger();
    const flushSpy = vi.spyOn(logger, "flush").mockResolvedValue();
    installGlobalErrorHandlers(logger);
    window.dispatchEvent(new Event("pagehide"));
    expect(flushSpy).toHaveBeenCalledWith(true);
  });
});

describe("trace id fallback", () => {
  it("uses getRandomValues when randomUUID is unavailable", async () => {
    vi.resetModules();
    const original = crypto.randomUUID;
    Object.defineProperty(crypto, "randomUUID", {
      value: undefined,
      configurable: true,
    });
    try {
      const mod = await import("../../src/utils/logger");
      const fetchFn = vi.fn<typeof fetch>(() =>
        Promise.resolve(new Response(null, { status: 201 })),
      );
      const logger = new mod.Logger({
        server: "https://logs.example.com",
        apiKey: "k",
        apiToken: "t",
        fetchFn,
      });
      logger.info("x");
      await logger.flush();
      const body = JSON.parse(
        (fetchFn.mock.calls[0][1] as RequestInit).body as string,
      );
      expect(body.logs[0].trace_id).toMatch(/^[0-9a-f]{32}$/);
    } finally {
      Object.defineProperty(crypto, "randomUUID", {
        value: original,
        configurable: true,
      });
    }
  });
});
