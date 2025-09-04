import React from "react";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Bot className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold">GStraccini Bot</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Automate your GitHub workflow with powerful commands and
              integrations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://docs.gstraccini.bot"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://docs.gstraccini.bot/api"
                  className="hover:text-white transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/guibranco/gstraccini-bot-service"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/marketplace/gstraccini-bot"
                  className="hover:text-white transition-colors"
                >
                  GitHub Marketplace
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  to="/status"
                  className="hover:text-white transition-colors"
                >
                  Service Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 GStraccini Bot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
