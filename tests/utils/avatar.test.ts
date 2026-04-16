import { describe, it, expect } from "vitest";
import { getAppAvatarUrl } from "../../src/utils/avatar";

describe("getAppAvatarUrl", () => {
  it("returns the correct GitHub app avatar URL", () => {
    expect(getAppAvatarUrl("my-app")).toBe(
      "https://github.com/apps/my-app.png",
    );
  });

  it("includes the appId in the URL path", () => {
    const appId = "gstraccini-bot";
    const url = getAppAvatarUrl(appId);
    expect(url).toContain(appId);
  });

  it("always points to github.com/apps", () => {
    const url = getAppAvatarUrl("any-app");
    expect(url).toMatch(/^https:\/\/github\.com\/apps\//);
  });

  it("ends with .png extension", () => {
    expect(getAppAvatarUrl("test-app")).toMatch(/\.png$/);
  });
});
