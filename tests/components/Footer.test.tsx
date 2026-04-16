import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "../../src/components/Footer";

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe("Footer", () => {
  it("renders without crashing", () => {
    const { container } = renderFooter();
    expect(container).toBeTruthy();
  });

  it("displays the GStraccini Bot brand name", () => {
    renderFooter();
    expect(screen.getByText("GStraccini Bot")).toBeInTheDocument();
  });

  it("displays the current year in the copyright notice", () => {
    renderFooter();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders Privacy Policy link", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toBeInTheDocument();
  });

  it("renders Terms of Service link", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: /terms of service/i }),
    ).toBeInTheDocument();
  });

  it("renders Security link", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: /^security$/i }),
    ).toBeInTheDocument();
  });

  it("renders Service Status link", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: /service status/i }),
    ).toBeInTheDocument();
  });

  it("renders Documentation external link", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: /documentation/i }),
    ).toBeInTheDocument();
  });

  it("renders GitHub Marketplace link", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: /github marketplace/i }),
    ).toBeInTheDocument();
  });

  it("renders GitHub Repository link", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: /github repository/i }),
    ).toBeInTheDocument();
  });
});
