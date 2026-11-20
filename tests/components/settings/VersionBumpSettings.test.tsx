import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VersionBumpSettings } from "../../../src/components/settings/VersionBumpSettings";
import type {
  AccountFeatureSettings,
  RepositoryFeatureSettings,
} from "../../../src/types";

const accounts: AccountFeatureSettings[] = [
  {
    accountId: 1,
    accountLogin: "acme",
    accountType: "Organization",
    requestVersionBump: true,
  },
];

const repositories: RepositoryFeatureSettings[] = [
  {
    repositoryId: 10,
    fullName: "acme/api",
    private: false,
    accountId: 1,
    accountLogin: "acme",
    requestVersionBump: null,
  },
  {
    repositoryId: 11,
    fullName: "acme/web",
    private: true,
    accountId: 1,
    accountLogin: "acme",
    requestVersionBump: false,
  },
];

function renderSettings(
  onAccountChange = vi.fn(),
  onRepositoryChange = vi.fn(),
) {
  render(
    <VersionBumpSettings
      icon={<span />}
      accounts={accounts}
      repositories={repositories}
      onAccountChange={onAccountChange}
      onRepositoryChange={onRepositoryChange}
    />,
  );
}

describe("VersionBumpSettings", () => {
  it("shows the effective value of each repository", () => {
    renderSettings();
    expect(screen.getByTestId("effective_10")).toHaveTextContent("On");
    expect(screen.getByTestId("effective_11")).toHaveTextContent("Off");
  });

  it("reports an account toggle", async () => {
    const onAccountChange = vi.fn();
    renderSettings(onAccountChange);
    await userEvent.click(
      document.getElementById("request_version_bump_account_1")!,
    );
    expect(onAccountChange).toHaveBeenCalledWith(1, false);
  });

  it("reports a repository override, null for inherit", async () => {
    const onRepositoryChange = vi.fn();
    renderSettings(vi.fn(), onRepositoryChange);
    await userEvent.selectOptions(
      screen.getByLabelText("acme/web"),
      "inherit",
    );
    expect(onRepositoryChange).toHaveBeenCalledWith(11, null);
    await userEvent.selectOptions(screen.getByLabelText("acme/api"), "on");
    expect(onRepositoryChange).toHaveBeenCalledWith(10, true);
  });

  it("filters the repositories", async () => {
    renderSettings();
    await userEvent.type(screen.getByLabelText("Filter repositories"), "web");
    expect(screen.queryByText("acme/api")).not.toBeInTheDocument();
    expect(screen.getByText("acme/web")).toBeInTheDocument();
  });
});
