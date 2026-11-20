import { describe, it, expect } from "vitest";
import {
  fromOverride,
  isRequestVersionBumpEnabled,
  resolveFeature,
  toOverride,
} from "../../src/utils/featureSettings";
import type {
  AccountFeatureSettings,
  RepositoryFeatureSettings,
} from "../../src/types";

const account = (requestVersionBump: boolean): AccountFeatureSettings => ({
  accountId: 1,
  accountLogin: "acme",
  accountType: "Organization",
  requestVersionBump,
});

const repository = (
  requestVersionBump: boolean | null,
): RepositoryFeatureSettings => ({
  repositoryId: 10,
  fullName: "acme/api",
  private: false,
  accountId: 1,
  accountLogin: "acme",
  requestVersionBump,
});

describe("resolveFeature", () => {
  it("is disabled when nothing is set (opt-in)", () => {
    expect(resolveFeature(null, undefined)).toBe(false);
    expect(resolveFeature(undefined, null)).toBe(false);
  });

  it("inherits the account when the repository does not set it", () => {
    expect(resolveFeature(null, true)).toBe(true);
    expect(resolveFeature(null, false)).toBe(false);
  });

  it("lets the repository override the account", () => {
    expect(resolveFeature(true, false)).toBe(true);
    expect(resolveFeature(false, true)).toBe(false);
  });
});

describe("isRequestVersionBumpEnabled", () => {
  it("uses the repository's account", () => {
    expect(isRequestVersionBumpEnabled(repository(null), [account(true)])).toBe(
      true,
    );
    expect(isRequestVersionBumpEnabled(repository(false), [account(true)])).toBe(
      false,
    );
  });

  it("is disabled when the account is unknown", () => {
    expect(isRequestVersionBumpEnabled(repository(null), [])).toBe(false);
  });
});

describe("override conversion", () => {
  it("round-trips", () => {
    for (const value of [null, true, false]) {
      expect(fromOverride(toOverride(value))).toBe(value);
    }
  });
});
