import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingFooter from "../../src/components/LandingFooter";

function renderFooter() {
  return render(
    <MemoryRouter>
      <LandingFooter />
    </MemoryRouter>,
  );
}

describe("LandingFooter", () => {
  it("renders without crashing", () => {
    const { container } = renderFooter();
    expect(container).toBeTruthy();
  });

  it("displays the GStraccini Bot brand name", () => {
    renderFooter();
    expect(screen.getByText("GStraccini Bot")).toBeInTheDocument();
  });

  it("renders the Resources section heading", () => {
    renderFooter();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders the Legal section heading", () => {
    renderFooter();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders Documentation link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /^documentation$/i })).toBeInTheDocument();
  });

  it("renders GitHub link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /^github$/i })).toBeInTheDocument();
  });

  it("renders GitHub Marketplace link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /github marketplace/i })).toBeInTheDocument();
  });

  it("renders Privacy link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /^privacy$/i })).toBeInTheDocument();
  });

  it("renders Terms link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /^terms$/i })).toBeInTheDocument();
  });

  it("renders Security link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /^security$/i })).toBeInTheDocument();
  });

  it("renders Service Status link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /service status/i })).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    renderFooter();
    expect(screen.getByText(/GStraccini Bot\. All rights reserved\./)).toBeInTheDocument();
  });
});
