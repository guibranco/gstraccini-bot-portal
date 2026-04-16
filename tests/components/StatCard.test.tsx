import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { StatCard } from "../../src/components/StatCard";

describe("StatCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the title", () => {
    render(<StatCard title="Total PRs" value={100} icon={<span>icon</span>} />);
    expect(screen.getByText("Total PRs")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<StatCard title="Issues" value={5} icon={<span data-testid="icon">★</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("starts at 0 before animation completes", () => {
    render(<StatCard title="Repos" value={50} icon={<span />} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("reaches the target value after animation completes", () => {
    render(<StatCard title="Repos" value={60} icon={<span />} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText("60")).toBeInTheDocument();
  });

  it("renders value 0 immediately when value is 0", () => {
    render(<StatCard title="Empty" value={0} icon={<span />} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
