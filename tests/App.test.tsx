import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it("renders the landing page hero heading at the default route", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: "GStraccini Bot" }),
    ).toBeInTheDocument();
  });

  it("renders a Sign In link for unauthenticated users", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });
});
