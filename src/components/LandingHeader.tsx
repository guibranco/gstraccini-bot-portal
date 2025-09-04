import React, { useState, useEffect } from "react";
import { Bot, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LandingHeader() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsMenuHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-transform duration-300"
        style={{
          transform: isMenuHidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  GStraccini Bot
                </span>
              </Link>
            </div>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <a
                    href="https://docs.bot.straccini.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                {isAuthenticated ? (
                  <li>
                    <button
                      onClick={logout}
                      className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/auth"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div className="h-16" />{" "}
      {/* Spacer to prevent content from hiding under fixed header */}
    </>
  );
}
