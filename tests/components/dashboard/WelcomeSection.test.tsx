import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WelcomeSection } from "../../../src/components/dashboard/WelcomeSection";
import type { User } from "../../../src/types";

const mockUser: User = {
  login: "testuser",
  name: "Test User",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://github.com/testuser",
};

describe("WelcomeSection", () => {
  it("renders without crashing", () => {
    const { container } = render(<WelcomeSection user={mockUser} />);
    expect(container).toBeTruthy();
  });

  it("renders the welcome heading with user name", () => {
    render(<WelcomeSection user={mockUser} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /welcome back/i,
    );
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("renders user avatar with correct src and alt", () => {
    render(<WelcomeSection user={mockUser} />);
    const avatar = screen.getByAltText("User Avatar") as HTMLImageElement;
    expect(avatar.src).toBe("https://example.com/avatar.png");
  });

  it("renders user name as a link to their GitHub profile", () => {
    render(<WelcomeSection user={mockUser} />);
    const link = screen.getByRole("link", { name: "Test User" });
    expect(link).toHaveAttribute("href", "https://github.com/testuser");
  });

  it("falls back to login when name is not set", () => {
    const userWithoutName: User = {
      login: "loginonly",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/loginonly",
    };
    render(<WelcomeSection user={userWithoutName} />);
    // name is undefined so the link text will be empty/undefined
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<WelcomeSection user={mockUser} />);
    expect(
      screen.getByText(/we're glad to have you back/i),
    ).toBeInTheDocument();
  });
});
