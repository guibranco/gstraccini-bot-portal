import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationItem } from "../../../src/components/notifications/NotificationItem";
import type { Notification } from "../../../src/types";

const sender = {
  login: "octocat",
  name: "Octocat",
  avatar_url: "https://example.com/octocat.png",
  html_url: "https://github.com/octocat",
};

function makeNotification(
  overrides: Partial<Notification> = {},
): Notification {
  return {
    id: "notif-1",
    type: "pr_review",
    title: "Review requested on PR #42",
    description: "Please review this pull request",
    repository: "my-repo",
    full_name: "owner/my-repo",
    created_at: "2024-03-15T10:00:00Z",
    read: false,
    url: "https://github.com/owner/my-repo/pull/42",
    sender,
    ...overrides,
  };
}

describe("NotificationItem", () => {
  it("renders the notification title as a link", () => {
    render(
      <NotificationItem
        notification={makeNotification()}
        onMarkAsRead={vi.fn()}
      />,
    );
    const link = screen.getByRole("link", { name: /review requested on pr #42/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/owner/my-repo/pull/42");
  });

  it("renders the notification description", () => {
    render(
      <NotificationItem
        notification={makeNotification()}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.getByText("Please review this pull request")).toBeInTheDocument();
  });

  it("renders the sender name as a link", () => {
    render(
      <NotificationItem
        notification={makeNotification()}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.getByRole("link", { name: "Octocat" })).toBeInTheDocument();
  });

  it("renders the repository name", () => {
    render(
      <NotificationItem
        notification={makeNotification()}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.getByText("my-repo")).toBeInTheDocument();
  });

  it("shows Mark as read button for unread notifications", () => {
    render(
      <NotificationItem
        notification={makeNotification({ read: false })}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: /mark as read/i })).toBeInTheDocument();
  });

  it("does not show Mark as read button for read notifications", () => {
    render(
      <NotificationItem
        notification={makeNotification({ read: true })}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.queryByRole("button", { name: /mark as read/i })).not.toBeInTheDocument();
  });

  it("calls onMarkAsRead with the notification id when button clicked", async () => {
    const onMarkAsRead = vi.fn();
    render(
      <NotificationItem
        notification={makeNotification({ id: "notif-42" })}
        onMarkAsRead={onMarkAsRead}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /mark as read/i }));
    expect(onMarkAsRead).toHaveBeenCalledWith("notif-42");
  });

  it("renders priority badge when priority is set", () => {
    render(
      <NotificationItem
        notification={makeNotification({ priority: "high" })}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.getByText("high")).toBeInTheDocument();
  });

  it("does not render priority badge when priority is not set", () => {
    render(
      <NotificationItem
        notification={makeNotification({ priority: undefined })}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.queryByText("high")).not.toBeInTheDocument();
    expect(screen.queryByText("medium")).not.toBeInTheDocument();
    expect(screen.queryByText("low")).not.toBeInTheDocument();
  });

  it("renders sender avatar with correct src", () => {
    render(
      <NotificationItem
        notification={makeNotification()}
        onMarkAsRead={vi.fn()}
      />,
    );
    const avatar = screen.getByAltText("Octocat") as HTMLImageElement;
    expect(avatar.src).toBe("https://example.com/octocat.png");
  });

  it("uses sender login as alt text when name is not set", () => {
    render(
      <NotificationItem
        notification={makeNotification({
          sender: { ...sender, name: undefined },
        })}
        onMarkAsRead={vi.fn()}
      />,
    );
    expect(screen.getByAltText("octocat")).toBeInTheDocument();
  });
});
