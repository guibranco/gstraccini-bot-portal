/**
 * LogStream client for the portal.
 *
 * Entries are queued and sent in batches to `POST {server}/api/logs`, using the
 * per-client authentication (`X-Api-Key` + `X-Api-Token`). The `app_id` is the
 * running portal version, so each log line can be tied back to a release.
 *
 * The logger is a no-op unless the server, API key and API token are all set at
 * build time (VITE_LOGSTREAM_SERVER / VITE_LOGSTREAM_API_KEY /
 * VITE_LOGSTREAM_API_TOKEN), so local dev, tests and PR builds never ship logs.
 */

export type LogLevel =
  "debug" | "info" | "notice" | "warning" | "error" | "critical";

export type LogContext = Record<string, unknown>;

export interface LoggerConfig {
  server?: string;
  apiKey?: string;
  apiToken?: string;
  appId?: string;
  /** Max entries per request. */
  batchSize?: number;
  /** Delay before a partial batch is flushed, in ms. */
  flushIntervalMs?: number;
  /** Entries kept while the server is unreachable; oldest are dropped first. */
  maxQueueSize?: number;
  fetchFn?: typeof fetch;
}

interface LogEntry {
  level: LogLevel;
  category: string;
  message: string;
  context?: LogContext;
  timestamp: string;
  trace_id: string;
}

const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_FLUSH_INTERVAL_MS = 5000;
const DEFAULT_MAX_QUEUE_SIZE = 200;

/** One id per page load, so all entries from the same visit can be grouped. */
function newTraceId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

/** Accepts the server root with or without a trailing slash or `/api/logs`. */
export function buildIngestUrl(server: string): string {
  const base = server.trim().replace(/\/+$/, "");
  return base.endsWith("/api/logs") ? base : `${base}/api/logs`;
}

/** Turns anything thrown into a plain, JSON-safe context object. */
export function serializeError(error: unknown): LogContext {
  if (error instanceof Error) {
    return {
      error_name: error.name,
      error_message: error.message,
      stack: error.stack,
    };
  }
  return { error_message: String(error) };
}

export class Logger {
  private readonly url: string | null;
  private readonly headers: Record<string, string>;
  private readonly appId: string;
  private readonly batchSize: number;
  private readonly flushIntervalMs: number;
  private readonly maxQueueSize: number;
  private readonly fetchFn?: typeof fetch;
  private readonly traceId = newTraceId();
  private queue: LogEntry[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private sending = false;

  constructor(config: LoggerConfig) {
    const enabled = Boolean(
      config.server?.trim() && config.apiKey?.trim() && config.apiToken?.trim(),
    );

    this.url = enabled ? buildIngestUrl(config.server as string) : null;
    this.headers = enabled
      ? {
          "Content-Type": "application/json",
          "X-Api-Key": (config.apiKey as string).trim(),
          "X-Api-Token": (config.apiToken as string).trim(),
        }
      : {};
    this.appId = config.appId?.trim() || "dev";
    this.batchSize = config.batchSize ?? DEFAULT_BATCH_SIZE;
    this.flushIntervalMs = config.flushIntervalMs ?? DEFAULT_FLUSH_INTERVAL_MS;
    this.maxQueueSize = config.maxQueueSize ?? DEFAULT_MAX_QUEUE_SIZE;
    this.fetchFn = config.fetchFn;
  }

  get enabled(): boolean {
    return this.url !== null;
  }

  get pending(): number {
    return this.queue.length;
  }

  debug(message: string, context?: LogContext, category?: string): void {
    this.log("debug", message, context, category);
  }

  info(message: string, context?: LogContext, category?: string): void {
    this.log("info", message, context, category);
  }

  warning(message: string, context?: LogContext, category?: string): void {
    this.log("warning", message, context, category);
  }

  error(message: string, context?: LogContext, category?: string): void {
    this.log("error", message, context, category);
  }

  critical(message: string, context?: LogContext, category?: string): void {
    this.log("critical", message, context, category);
  }

  log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    category = "portal",
  ): void {
    if (!this.enabled) {
      return;
    }

    this.queue.push({
      level,
      category,
      message,
      context: { ...this.pageContext(), ...context },
      timestamp: new Date().toISOString(),
      trace_id: this.traceId,
    });

    if (this.queue.length > this.maxQueueSize) {
      this.queue.splice(0, this.queue.length - this.maxQueueSize);
    }

    if (this.queue.length >= this.batchSize) {
      void this.flush();
    } else {
      this.scheduleFlush();
    }
  }

  /** Sends everything queued. Failed batches go back to the front of the queue. */
  async flush(keepalive = false): Promise<void> {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (!this.url || this.sending || this.queue.length === 0) {
      return;
    }

    this.sending = true;
    try {
      while (this.queue.length > 0) {
        const batch = this.queue.splice(0, this.batchSize);
        const delivered = await this.send(batch, keepalive);
        if (!delivered) {
          this.queue.unshift(...batch);
          this.queue.splice(this.maxQueueSize);
          this.scheduleFlush();
          break;
        }
      }
    } finally {
      this.sending = false;
    }
  }

  private async send(batch: LogEntry[], keepalive: boolean): Promise<boolean> {
    const fetchFn = this.fetchFn ?? globalThis.fetch;
    if (typeof fetchFn !== "function") {
      return false;
    }

    try {
      const response = await fetchFn(this.url as string, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ app_id: this.appId, logs: batch }),
        keepalive,
      });
      // 4xx means the payload or credentials are wrong; retrying won't help.
      return response.ok || (response.status >= 400 && response.status < 500);
    } catch {
      // Never log from here: a failing LogStream must not cause a log loop.
      return false;
    }
  }

  private scheduleFlush(): void {
    if (this.timer === null) {
      this.timer = setTimeout(() => {
        this.timer = null;
        void this.flush();
      }, this.flushIntervalMs);
    }
  }

  private pageContext(): LogContext {
    if (typeof window === "undefined") {
      return {};
    }
    return {
      url: window.location.href,
      route: window.location.hash.replace(/^#/, "") || "/",
    };
  }
}

export const logger = new Logger({
  server: import.meta.env.VITE_LOGSTREAM_SERVER,
  apiKey: import.meta.env.VITE_LOGSTREAM_API_KEY,
  apiToken: import.meta.env.VITE_LOGSTREAM_API_TOKEN,
  appId: import.meta.env.VITE_APP_VERSION,
});

let handlersInstalled = false;

/** Captures uncaught errors and unhandled rejections, and flushes when the page is hidden. */
export function installGlobalErrorHandlers(target: Logger = logger): void {
  if (handlersInstalled || typeof window === "undefined" || !target.enabled) {
    return;
  }
  handlersInstalled = true;

  window.addEventListener("error", (event: ErrorEvent) => {
    target.error(
      event.message || "Uncaught error",
      {
        ...serializeError(event.error ?? event.message),
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      },
      "uncaught-error",
    );
  });

  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      target.error(
        "Unhandled promise rejection",
        serializeError(event.reason),
        "unhandled-rejection",
      );
    },
  );

  // keepalive lets the last batch survive the tab being closed.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      void target.flush(true);
    }
  });
  window.addEventListener("pagehide", () => {
    void target.flush(true);
  });
}

/** For tests only. */
export function resetGlobalErrorHandlersForTests(): void {
  handlersInstalled = false;
}
