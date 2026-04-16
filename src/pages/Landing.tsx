import React from "react";
import { Link } from "react-router-dom";
import { Bot, Github, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import FeaturesGrid from "../components/FeaturesGrid";
import CommandsSection from "../components/CommandsSection";
import LandingHeader from "../components/LandingHeader";
import LandingFooter from "../components/LandingFooter";

export function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0069d9] to-[#0056b3] py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Bot className="mx-auto h-16 w-16 text-white mb-8" />
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              GStraccini Bot
            </h1>
            <p className="text-lg leading-8 text-gray-200 mb-8">
              Supercharge your GitHub workflow with automated PR management,
              code quality checks, and intelligent issue handling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/marketplace/gstraccini-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              {isAuthenticated ? (
                <a
                  href="https://dashboard.gstraccini.bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Login with GitHub
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <FeaturesGrid />
      <CommandsSection />

      <LandingFooter />
    </div>
  );
}
