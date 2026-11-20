import { ReactNode, useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import { SettingToggle } from "./SettingToggle";
import type {
  AccountFeatureSettings,
  RepositoryFeatureSettings,
} from "../../types";
import {
  FeatureOverride,
  fromOverride,
  isRequestVersionBumpEnabled,
  toOverride,
} from "../../utils/featureSettings";

interface VersionBumpSettingsProps {
  icon: ReactNode;
  accounts: AccountFeatureSettings[];
  repositories: RepositoryFeatureSettings[];
  onAccountChange: (accountId: number, value: boolean) => void;
  onRepositoryChange: (repositoryId: number, value: boolean | null) => void;
}

export function VersionBumpSettings({
  icon,
  accounts,
  repositories,
  onAccountChange,
  onRepositoryChange,
}: VersionBumpSettingsProps) {
  const [filter, setFilter] = useState("");

  const visibleRepositories = useMemo(() => {
    const term = filter.trim().toLowerCase();
    return term === ""
      ? repositories
      : repositories.filter((r) => r.fullName.toLowerCase().includes(term));
  }, [filter, repositories]);

  return (
    <SettingsCard title="Request Version Bump" icon={icon}>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        When enabled, the bot asks for a version bump decision (major, minor or
        none) on pull requests that look like a feature and have no{" "}
        <code>+semver:</code> directive, holding the <em>pull request</em> check
        run until one is chosen. Disabled by default. Repositories inherit
        their account unless set otherwise.
      </p>

      {accounts.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No installation found for your account.
        </p>
      ) : (
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Accounts
            </h3>
            {accounts.map((account) => (
              <SettingToggle
                key={account.accountId}
                id={`request_version_bump_account_${account.accountId}`}
                label={account.accountLogin}
                description={`Request a version bump decision on every repository of this ${account.accountType === "Organization" ? "organization" : "user"} that does not override it`}
                checked={account.requestVersionBump}
                onChange={(checked) =>
                  onAccountChange(account.accountId, checked)
                }
              />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Repositories
            </h3>
            {repositories.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No repository found.
              </p>
            ) : (
              <>
                <input
                  type="search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter repositories"
                  aria-label="Filter repositories"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                  {visibleRepositories.map((repository) => {
                    const selectId = `request_version_bump_repository_${repository.repositoryId}`;
                    const effective = isRequestVersionBumpEnabled(
                      repository,
                      accounts,
                    );
                    return (
                      <li
                        key={repository.repositoryId}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <label
                          htmlFor={selectId}
                          className="flex items-center gap-2 text-sm text-gray-900 dark:text-white min-w-0"
                        >
                          {repository.private && (
                            <Lock
                              className="w-4 h-4 text-gray-400 shrink-0"
                              aria-label="Private"
                            />
                          )}
                          <span className="truncate">
                            {repository.fullName}
                          </span>
                        </label>
                        <div className="flex items-center gap-3 shrink-0">
                          <select
                            id={selectId}
                            value={toOverride(repository.requestVersionBump)}
                            onChange={(e) =>
                              onRepositoryChange(
                                repository.repositoryId,
                                fromOverride(e.target.value as FeatureOverride),
                              )
                            }
                            className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                          >
                            <option value="inherit">Inherit from account</option>
                            <option value="on">Enabled</option>
                            <option value="off">Disabled</option>
                          </select>
                          <span
                            data-testid={`effective_${repository.repositoryId}`}
                            className={`inline-flex w-12 justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              effective
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {effective ? "On" : "Off"}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </SettingsCard>
  );
}
