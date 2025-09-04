import { Eye, EyeOff, Plus, Clock, Terminal, Play } from "lucide-react";
import { Provider } from "../../types";
import { providerCommands, providerActions } from "./integrationData";

interface AddIntegrationProps {
  providers: Record<string, Provider>;
  availableProviders: [string, Provider][];
  selectedProvider: string;
  apiKey: string;
  showApiKey: Record<string, boolean>;
  isValidating: boolean;
  onProviderSelect: (provider: string) => void;
  onApiKeyChange: (key: string) => void;
  onToggleApiKeyVisibility: () => void;
  onSubmit: () => void;
}

export function AddIntegration({
  providers,
  availableProviders,
  selectedProvider,
  apiKey,
  showApiKey,
  isValidating,
  onProviderSelect,
  onApiKeyChange,
  onToggleApiKeyVisibility,
  onSubmit,
}: AddIntegrationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Add Integration
        </h2>

        {availableProviders.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            All available integrations have been configured
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Available Integrations */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Available Integrations
              </h3>
              <div className="max-h-[400px] overflow-y-auto pr-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {availableProviders.map(([key, provider]) => (
                  <button
                    key={key}
                    onClick={() => onProviderSelect(key)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      selectedProvider === key
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                  >
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="w-8 h-8"
                    />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {provider.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {provider.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Form and Details */}
            <div className="lg:border-l lg:border-gray-200 lg:dark:border-gray-700 lg:pl-8">
              {selectedProvider ? (
                <div className="space-y-8">
                  {/* API Key Input */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          API Key
                        </label>
                        <div className="relative">
                          <input
                            type={showApiKey["new"] ? "text" : "password"}
                            value={apiKey}
                            onChange={(e) => onApiKeyChange(e.target.value)}
                            placeholder="Enter API Key"
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={onToggleApiKeyVisibility}
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                          >
                            {showApiKey["new"] ? (
                              <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={onSubmit}
                        disabled={
                          !selectedProvider ||
                          apiKey.length < 10 ||
                          isValidating
                        }
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isValidating ? (
                          <>
                            <Clock className="w-5 h-5 mr-2 animate-spin" />
                            Validating...
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            Add Integration
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Commands */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <Terminal className="w-5 h-5 mr-2" />
                      Available Commands
                    </h3>
                    <div className="space-y-3">
                      {providerCommands[selectedProvider]?.map((cmd, index) => (
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
                    <div className="space-y-3">
                      {providerActions[selectedProvider]?.map(
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
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  Select an integration from the list to configure
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
