import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationFilters } from "../../../src/components/notifications/NotificationFilters";

const defaultProps = {
  showUnreadOnly: false,
  selectedTypes: [],
  selectedPriorities: [],
  selectedSenders: [],
  typeOptions: [
    { value: "pr_review", label: "PR Review", color: "3b82f6" },
    { value: "pr_merged", label: "PR Merged", color: "8b5cf6" },
  ],
  priorityOptions: [
    { value: "high", label: "High", color: "ef4444" },
    { value: "low", label: "Low", color: "22c55e" },
  ],
  senderOptions: [
    {
      value: "octocat",
      label: "Octocat",
      avatar: "https://example.com/octocat.png",
    },
  ],
  isFiltersExpanded: false,
  onToggleUnreadOnly: vi.fn(),
  onTypesChange: vi.fn(),
  onPrioritiesChange: vi.fn(),
  onSendersChange: vi.fn(),
  onToggleExpanded: vi.fn(),
  onClearFilters: vi.fn(),
};

describe("NotificationFilters", () => {
  it("renders the Filters heading", () => {
    render(<NotificationFilters {...defaultProps} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders Show More button when filters are collapsed", () => {
    render(<NotificationFilters {...defaultProps} isFiltersExpanded={false} />);
    expect(
      screen.getByRole("button", { name: /show more/i }),
    ).toBeInTheDocument();
  });

  it("renders Show Less button when filters are expanded", () => {
    render(<NotificationFilters {...defaultProps} isFiltersExpanded={true} />);
    expect(
      screen.getByRole("button", { name: /show less/i }),
    ).toBeInTheDocument();
  });

  it("calls onToggleExpanded when Show More/Less is clicked", async () => {
    const onToggleExpanded = vi.fn();
    render(
      <NotificationFilters
        {...defaultProps}
        onToggleExpanded={onToggleExpanded}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /show more/i }));
    expect(onToggleExpanded).toHaveBeenCalledOnce();
  });

  it("renders the Status filter section", () => {
    render(<NotificationFilters {...defaultProps} />);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders the Type filter section", () => {
    render(<NotificationFilters {...defaultProps} />);
    expect(screen.getByText("Type")).toBeInTheDocument();
  });

  it("calls onToggleUnreadOnly when Show unread only button is clicked", async () => {
    const onToggleUnreadOnly = vi.fn();
    render(
      <NotificationFilters
        {...defaultProps}
        onToggleUnreadOnly={onToggleUnreadOnly}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /show unread only/i }),
    );
    expect(onToggleUnreadOnly).toHaveBeenCalledOnce();
  });

  it("does not show Clear Filters button when no active filters", () => {
    render(<NotificationFilters {...defaultProps} />);
    expect(
      screen.queryByRole("button", { name: /clear filters/i }),
    ).not.toBeInTheDocument();
  });

  it("shows Clear Filters button when showUnreadOnly is true", () => {
    render(<NotificationFilters {...defaultProps} showUnreadOnly={true} />);
    expect(
      screen.getByRole("button", { name: /clear filters/i }),
    ).toBeInTheDocument();
  });

  it("shows Clear Filters button when types are selected", () => {
    render(
      <NotificationFilters {...defaultProps} selectedTypes={["pr_review"]} />,
    );
    expect(
      screen.getByRole("button", { name: /clear filters/i }),
    ).toBeInTheDocument();
  });

  it("calls onClearFilters when Clear Filters is clicked", async () => {
    const onClearFilters = vi.fn();
    render(
      <NotificationFilters
        {...defaultProps}
        showUnreadOnly={true}
        onClearFilters={onClearFilters}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /clear filters/i }),
    );
    expect(onClearFilters).toHaveBeenCalledOnce();
  });
});
