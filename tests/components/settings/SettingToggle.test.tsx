import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SettingToggle } from "../../../src/components/settings/SettingToggle";

describe("SettingToggle", () => {
  it("renders label and description", () => {
    render(
      <SettingToggle
        id="test-toggle"
        label="Enable Feature"
        description="This enables the feature"
        checked={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText("Enable Feature")).toBeInTheDocument();
    expect(screen.getByText("This enables the feature")).toBeInTheDocument();
  });

  it("renders checkbox with correct checked state when false", () => {
    render(
      <SettingToggle
        id="toggle-off"
        label="Feature"
        description="desc"
        checked={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders checkbox with correct checked state when true", () => {
    render(
      <SettingToggle
        id="toggle-on"
        label="Feature"
        description="desc"
        checked={true}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange when checkbox is toggled", async () => {
    const onChange = vi.fn();
    render(
      <SettingToggle
        id="toggle-cb"
        label="Feature"
        description="desc"
        checked={false}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("renders optional note when provided", () => {
    render(
      <SettingToggle
        id="toggle-note"
        label="Feature"
        description="desc"
        checked={false}
        onChange={vi.fn()}
        note="This is a note"
      />,
    );
    expect(screen.getByText("This is a note")).toBeInTheDocument();
  });

  it("does not render note when not provided", () => {
    render(
      <SettingToggle
        id="toggle-nonote"
        label="Feature"
        description="desc"
        checked={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("renders badges when provided", () => {
    render(
      <SettingToggle
        id="toggle-badges"
        label="Feature"
        description="desc"
        checked={false}
        onChange={vi.fn()}
        badges={[
          { text: "fix", icon: "wrench" },
          { text: "task", icon: "tasks" },
          { text: "bug", icon: "bug" },
        ]}
      />,
    );
    expect(screen.getByText("fix")).toBeInTheDocument();
    expect(screen.getByText("task")).toBeInTheDocument();
    expect(screen.getByText("bug")).toBeInTheDocument();
  });

  it("disables the checkbox when disabled prop is true", () => {
    render(
      <SettingToggle
        id="toggle-disabled"
        label="Feature"
        description="desc"
        checked={false}
        onChange={vi.fn()}
        disabled={true}
      />,
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("applies opacity when disabled", () => {
    const { container } = render(
      <SettingToggle
        id="toggle-opacity"
        label="Feature"
        description="desc"
        checked={false}
        onChange={vi.fn()}
        disabled={true}
      />,
    );
    expect(container.firstChild).toHaveClass("opacity-50");
  });
});
