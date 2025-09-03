import { Cable, Clock, ExternalLink } from "lucide-react";
import type { Integration } from "../../types";

interface IntegrationsSectionProps {
  integrations: Integration[];
}

export function IntegrationsSection({
  integrations = [],
}: IntegrationsSectionProps) {
  if (!integrations?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:col-span-2">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
            <Cable className="w-5 h-5 mr-2" />
            Third-party Integrations
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            No integrations found.
          </p>
        </div>
      </div>
    );
  }

  const renderMetricValue = (value: unknown): string => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:col-span-2">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
          <Cable className="w-5 h-5 mr-2" />
          Third-party Integrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {integration.provider}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    integration.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {integration.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  Last check:{" "}
                  {new Date(integration.last_check).toLocaleString()}
                </div>
                {integration.metrics && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(integration.metrics).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-500 dark:text-gray-400">
                          {key.replace(/_/g, " ")}:
                        </span>
                        <span className="ml-1 font-medium text-gray-900 dark:text-white">
                          {renderMetricValue(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {integration.url && (
                  <a
                    href={integration.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    View details
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
