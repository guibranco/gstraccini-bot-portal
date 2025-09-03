import { Globe, ExternalLink } from "lucide-react";
import type { Pages } from "../../types";

interface PagesSectionProps {
  pages: Pages;
}

export function PagesSection({ pages }: PagesSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
          <Globe className="w-5 h-5 mr-2" />
          GitHub Pages
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <a
              href={pages.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
            >
              {pages.url}
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                pages.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              }`}
            >
              {pages.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Environment
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {pages.environment}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Protection
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {pages.protected ? "Protected" : "Not protected"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">HTTPS</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {pages.https_enforced ? "Enforced" : "Not enforced"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Custom 404
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {pages.custom_404 ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
