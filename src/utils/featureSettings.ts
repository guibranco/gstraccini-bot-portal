import type {
  AccountFeatureSettings,
  RepositoryFeatureSettings,
} from "../types";

/** How a repository sets an opt-in feature: inherit its account, or force it on / off. */
export type FeatureOverride = "inherit" | "on" | "off";

/**
 * Resolves a feature the way gstraccini-bot-service does: the repository
 * value when set, else the account value, else disabled (opt-in).
 */
export function resolveFeature(
  repositoryValue: boolean | null | undefined,
  accountValue: boolean | null | undefined,
): boolean {
  if (repositoryValue !== null && repositoryValue !== undefined) {
    return repositoryValue;
  }

  return accountValue ?? false;
}

/** Whether the version bump decision is requested on the repository's pull requests. */
export function isRequestVersionBumpEnabled(
  repository: RepositoryFeatureSettings,
  accounts: AccountFeatureSettings[],
): boolean {
  const account = accounts.find((a) => a.accountId === repository.accountId);
  return resolveFeature(
    repository.requestVersionBump,
    account?.requestVersionBump,
  );
}

export function toOverride(value: boolean | null): FeatureOverride {
  if (value === null) {
    return "inherit";
  }

  return value ? "on" : "off";
}

export function fromOverride(override: FeatureOverride): boolean | null {
  if (override === "inherit") {
    return null;
  }

  return override === "on";
}
