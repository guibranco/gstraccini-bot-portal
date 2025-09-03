import { useState } from "react";
import {
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Terminal,
  Play,
  History,
} from "lucide-react";
import type { Integration, Provider } from "../../types";
import { IntegrationHistoryModal } from "./IntegrationHistoryModal";
import { providerCommands, providerActions } from "./integrationData";

interface IntegrationsListProps {
  integrations: Integration[];
  providers: Record<string, Provider>;
  showApiKey: Record<string, boolean>;
  onToggleApiKeyVisibility: (provider: string) => void;
  onRemove: (provider: string) => void;
}

export function IntegrationsList({
  integrations,
  providers,
  showApiKey,
  onToggleApiKeyVisibility,
  onRemove,
}: IntegrationsListProps) {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(
    null,
  );

  const maskApiKey = (key: string) => {
    const visibleLength = 4;
    const maskedLength = key.length - visibleLength * 2;
    return `${key.slice(0, visibleLength)}${"*".repeat(maskedLength)}${key.slice(-visibleLength)}`;
  };

  const getStatusIcon = (status: Integration["status"]) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Inactive":
        return <XCircle className="w-5 h-5 text-gray-500" />;
      case "Error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "Validating":
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Current Integrations
        </h2>
        <div className="space-y-8">
          {integrations.map((integration) => (
            <div
              key={integration.provider}
              className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-8 last:pb-0"
            >
              {/* Integration Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={providers[integration.provider].logo}
                    alt={integration.provider}
                    className="w-8 h-8"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {integration.provider}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {providers[integration.provider].description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration.status)}
                    <span className="text-sm text-gray-900 dark:text-white">
                      {integration.status}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemove(integration.provider)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Usage Info */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Last Usage
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {integration.lastUsage === "N/A"
                      ? "Never"
                      : new Date(integration.lastUsage).toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Last Error
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {integration.lastError || "None"}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <button
                    onClick={() => setSelectedIntegration(integration.provider)}
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <History className="w-5 h-5" />
                    <span>View Usage History</span>
                  </button>
                </div>
              </div>

              {/* API Key */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">API Key:</span>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {showApiKey[integration.provider]
                      ? integration.apiKey
                      : maskApiKey(integration.apiKey)}
                  </code>
                  <button
                    onClick={() =>
                      onToggleApiKeyVisibility(integration.provider)
                    }
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showApiKey[integration.provider] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Commands */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  Available Commands
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {providerCommands[integration.provider]?.map((cmd, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                    >
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                        {cmd.command}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {cmd.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Available Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {providerActions[integration.provider]?.map(
                    (action, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {action.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {action.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Triggers on: {action.event}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}

          {integrations.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No active integrations found
            </div>
          )}
        </div>
      </div>

      {/* History Modal */}
      {selectedIntegration && (
        <IntegrationHistoryModal
          provider={selectedIntegration}
          history={
            integrations.find((i) => i.provider === selectedIntegration)
              ?.usageHistory || []
          }
          onClose={() => setSelectedIntegration(null)}
        />
      )}
    </div>
  );
}
