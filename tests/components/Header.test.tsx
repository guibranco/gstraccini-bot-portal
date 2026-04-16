import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../../src/components/Header";
import type { User } from "../../src/types";

const mockUser: User = {
  login: "testuser",
  name: "Test User",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://github.com/testuser",
};

function renderHeader(user = mockUser) {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Header user={user} />
    </MemoryRouter>,
  );
}

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => { store[key] = val; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

describe("Header", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it("renders without crashing", () => {
    const { container } = renderHeader();
    expect(container).toBeTruthy();
  });

  it("displays the GStraccini Bot brand name", () => {
    renderHeader();
    expect(screen.getByText("GStraccini Bot")).toBeInTheDocument();
  });

  it("renders Dashboard navigation link", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
  });

  it("renders Repositories navigation link", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /repositories/i })).toBeInTheDocument();
  });

  it("renders Issues navigation link", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /issues/i })).toBeInTheDocument();
  });

  it("renders Pull Requests navigation link", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /pull requests/i })).toBeInTheDocument();
  });

  it("renders user avatar with correct src", () => {
    renderHeader();
    const avatar = screen.getByAltText(/testuser.*avatar/i) as HTMLImageElement;
    expect(avatar.src).toBe("https://example.com/avatar.png");
  });

  it("renders toggle theme button", () => {
    renderHeader();
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("renders notifications button", () => {
    renderHeader();
    expect(screen.getByRole("button", { name: /notifications/i })).toBeInTheDocument();
  });

  it("opens notifications dropdown when notifications button is clicked", async () => {
    renderHeader();
    await userEvent.click(screen.getByRole("button", { name: /notifications/i }));
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all notifications/i })).toBeInTheDocument();
  });

  it("opens profile dropdown when avatar is clicked", async () => {
    renderHeader();
    // The profile button wraps the avatar image
    const profileButton = screen.getByAltText(/testuser.*avatar/i).closest("button")!;
    await userEvent.click(profileButton);
    expect(screen.getByRole("link", { name: /account/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("renders documentation link", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /documentation/i })).toBeInTheDocument();
  });
});
