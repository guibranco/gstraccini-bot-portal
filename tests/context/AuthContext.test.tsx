import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../src/context/AuthContext";

function AuthConsumer() {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="status">
        {isAuthenticated ? "authenticated" : "unauthenticated"}
      </span>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe("AuthProvider", () => {
  it("renders children", () => {
    render(
      <AuthProvider>
        <span>child content</span>
      </AuthProvider>,
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("starts with isAuthenticated as false", () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );
    expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
  });

  it("login() sets isAuthenticated to true", () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );
    act(() => screen.getByText("login").click());
    expect(screen.getByTestId("status").textContent).toBe("authenticated");
  });

  it("logout() sets isAuthenticated back to false", () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );
    act(() => screen.getByText("login").click());
    act(() => screen.getByText("logout").click());
    expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
  });
});

describe("useAuth", () => {
  it("throws when used outside AuthProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<AuthConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );
    spy.mockRestore();
  });
});
