import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../src/context/AuthContext";
import LandingHeader from "../../src/components/LandingHeader";

function renderHeader() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LandingHeader />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("LandingHeader", () => {
  it("renders without crashing", () => {
    const { container } = renderHeader();
    expect(container).toBeTruthy();
  });

  it("displays the GStraccini Bot brand name", () => {
    renderHeader();
    expect(screen.getByText("GStraccini Bot")).toBeInTheDocument();
  });

  it("renders the Home navigation link", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  it("renders the Documentation link", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /documentation/i })).toBeInTheDocument();
  });

  it("renders Sign In link when unauthenticated", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });

  it("does not render Dashboard link when unauthenticated", () => {
    renderHeader();
    expect(screen.queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
  });

  it("does not render Sign Out button when unauthenticated", () => {
    renderHeader();
    expect(screen.queryByRole("button", { name: /sign out/i })).not.toBeInTheDocument();
  });
});
