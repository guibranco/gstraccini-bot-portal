import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  AlertCircle,
  GitPullRequest,
  Sun,
  Moon,
  Bell,
  HelpCircle,
  User,
  Settings,
  Cable,
  LogOut,
  Bot,
  Home,
} from "lucide-react";
import type { User as UserType } from "../types";

interface HeaderProps {
  user: UserType;
}

export function Header({ user }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check system preference and localStorage on mount
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const storedPreference = localStorage.getItem("darkMode");
    const shouldUseDarkMode =
      storedPreference === "true" ||
      (storedPreference === null && darkModePreference);

    setIsDarkMode(shouldUseDarkMode);
    if (shouldUseDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("darkMode") === null) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    // Clear any authentication data here
    // localStorage.removeItem('authToken');
    // sessionStorage.clear();

    // Navigate to landing page
    navigate("/");
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-white">
                GStraccini Bot
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-700 dark:bg-gray-700"
                    : ""
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/dashboard/repositories"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors ${
                  location.pathname === "/dashboard/repositories"
                    ? "bg-blue-700 dark:bg-gray-700"
                    : ""
                }`}
              >
                <FolderOpen className="w-5 h-5" />
                <span>Repositories</span>
              </Link>
              <Link
                to="/dashboard/issues"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors ${
                  location.pathname === "/dashboard/issues"
                    ? "bg-blue-700 dark:bg-gray-700"
                    : ""
                }`}
              >
                <AlertCircle className="w-5 h-5" />
                <span>Issues</span>
              </Link>
              <Link
                to="/dashboard/pull-requests"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors ${
                  location.pathname === "/dashboard/pull-requests"
                    ? "bg-blue-700 dark:bg-gray-700"
                    : ""
                }`}
              >
                <GitPullRequest className="w-5 h-5" />
                <span>Pull Requests</span>
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 text-gray-800 dark:text-gray-200 z-50">
                  <div className="px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-700">
                    Notifications
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <p className="text-sm">New pull request in repository</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        2 minutes ago
                      </p>
                    </div>
                    {/* Add more notifications here */}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/dashboard/notifications"
                      className="block text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Documentation */}
            <a
              href="https://docs.gstraccini.bot"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              aria-label="Documentation"
            >
              <HelpCircle className="w-6 h-6" />
            </a>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 text-gray-800 dark:text-gray-200 z-50">
                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/account"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                  <Link
                    to="/dashboard/integrations"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Cable className="w-4 h-4 mr-2" />
                    Integrations
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
