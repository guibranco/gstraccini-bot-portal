import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SettingsCard } from "../../../src/components/settings/SettingsCard";

describe("SettingsCard", () => {
  it("renders the title", () => {
    render(
      <SettingsCard title="Repository Settings" icon={<span>icon</span>}>
        <p>content</p>
      </SettingsCard>,
    );
    expect(screen.getByText("Repository Settings")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <SettingsCard
        title="Settings"
        icon={<span data-testid="card-icon">★</span>}
      >
        <p>content</p>
      </SettingsCard>,
    );
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <SettingsCard title="Settings" icon={<span />}>
        <p data-testid="child">child content</p>
      </SettingsCard>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <SettingsCard title="Settings" icon={<span />}>
        <p>first child</p>
        <p>second child</p>
      </SettingsCard>,
    );
    expect(screen.getByText("first child")).toBeInTheDocument();
    expect(screen.getByText("second child")).toBeInTheDocument();
  });
});
