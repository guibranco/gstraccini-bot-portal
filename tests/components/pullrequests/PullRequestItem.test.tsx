import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PullRequestItem } from "../../../src/components/pullrequests/PullRequestItem";
import type { PullRequest } from "../../../src/types";

const sender = {
  login: "octocat",
  name: "Octocat",
  avatar_url: "https://example.com/octocat.png",
  html_url: "https://github.com/octocat",
};

function makePR(overrides: Partial<PullRequest> = {}): PullRequest {
  return {
    url: "https://github.com/owner/repo/pull/42",
    title: "Fix bug in auth module",
    repository: "my-repo",
    full_name: "owner/my-repo",
    created_at: "2024-03-15T10:00:00Z",
    state: "success",
    sender,
    ...overrides,
  };
}

function renderPR(pr: PullRequest) {
  return render(
    <MemoryRouter>
      <PullRequestItem pullRequest={pr} />
    </MemoryRouter>,
  );
}

describe("PullRequestItem", () => {
  it("renders without crashing", () => {
    const { container } = renderPR(makePR());
    expect(container).toBeTruthy();
  });

  it("renders the pull request title", () => {
    renderPR(makePR());
    expect(screen.getByText("Fix bug in auth module")).toBeInTheDocument();
  });

  it("renders the repository name as a link", () => {
    renderPR(makePR());
    expect(screen.getByRole("link", { name: "my-repo" })).toBeInTheDocument();
  });

  it("renders the sender name as a link", () => {
    renderPR(makePR());
    expect(screen.getByRole("link", { name: "Octocat" })).toBeInTheDocument();
  });

  it("renders sender avatar with correct src", () => {
    renderPR(makePR());
    const avatar = screen.getByAltText("Octocat") as HTMLImageElement;
    expect(avatar.src).toBe("https://example.com/octocat.png");
  });

  it("uses login as avatar alt text when name is not set", () => {
    renderPR(makePR({ sender: { ...sender, name: undefined } }));
    expect(screen.getByAltText("octocat")).toBeInTheDocument();
  });

  it("renders state badge for success", () => {
    renderPR(makePR({ state: "success" }));
    expect(screen.getByText("success")).toBeInTheDocument();
  });

  it("renders state badge for failure", () => {
    renderPR(makePR({ state: "failure" }));
    expect(screen.getByText("failure")).toBeInTheDocument();
  });

  it("renders state badge for pending", () => {
    renderPR(makePR({ state: "pending" }));
    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("renders state badge for error", () => {
    renderPR(makePR({ state: "error" }));
    expect(screen.getByText("error")).toBeInTheDocument();
  });

  it("renders state badge for skipped", () => {
    renderPR(makePR({ state: "skipped" }));
    expect(screen.getByText("skipped")).toBeInTheDocument();
  });

  it("renders labels when provided", () => {
    renderPR(
      makePR({
        labels: [
          { name: "bug", color: "d73a4a" },
          { name: "enhancement", color: "a2eeef" },
        ],
      }),
    );
    expect(screen.getByText("bug")).toBeInTheDocument();
    expect(screen.getByText("enhancement")).toBeInTheDocument();
  });

  it("does not render labels section when no labels", () => {
    renderPR(makePR({ labels: [] }));
    expect(screen.queryByText("bug")).not.toBeInTheDocument();
  });

  it("renders the external GitHub link", () => {
    renderPR(makePR());
    const externalLink = screen.getByTitle("View on GitHub");
    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveAttribute("href", "https://github.com/owner/repo/pull/42");
  });
});
