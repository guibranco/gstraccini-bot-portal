import { useState } from "react";
import { Cable } from "lucide-react";
import { AddIntegration } from "../components/integrations/AddIntegration";
import { IntegrationsList } from "../components/integrations/IntegrationsList";
import { mockProviders } from "../mockData";
import type { Integration } from "../types";

export function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      provider: "SonarCloud",
      apiKey: "sonar_12345678901234567890",
      status: "Active",
      lastUsage: "2024-03-15T10:30:00Z",
      lastError: "N/A",
    },
  ]);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [selectedProvider, setSelectedProvider] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const availableProviders = Object.entries(mockProviders).filter(
    ([key]) => !integrations.some((i) => i.provider === key),
  );

  const handleAddIntegration = async () => {
    if (!selectedProvider || apiKey.length < 10) {
      setError(
        "Please select a provider and enter a valid API key (minimum 10 characters)",
      );
      return;
    }

    setIsValidating(true);
    setError("");

    try {
      // Simulate API validation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newIntegration: Integration = {
        provider: selectedProvider,
        apiKey,
        status: "Active",
        lastUsage: "N/A",
        lastError: "N/A",
      };

      setIntegrations((prev) => [...prev, newIntegration]);
      setSuccess(`Integration for ${selectedProvider} added successfully!`);
      setSelectedProvider("");
      setApiKey("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to validate API key. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveIntegration = (provider: string) => {
    setIntegrations((prev) => prev.filter((i) => i.provider !== provider));
    setSuccess(`Integration for ${provider} removed successfully!`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleToggleApiKeyVisibility = (provider: string) => {
    setShowApiKey((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Cable className="w-8 h-8 text-gray-400" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Integrations
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your external service integrations
          </p>
        </div>
      </div>

      {(error || success) && (
        <div
          className={`mb-8 p-4 rounded-lg ${
            error
              ? "bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200"
              : "bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200"
          }`}
        >
          {error || success}
        </div>
      )}

      <AddIntegration
        providers={mockProviders}
        availableProviders={availableProviders}
        selectedProvider={selectedProvider}
        apiKey={apiKey}
        showApiKey={showApiKey}
        isValidating={isValidating}
        onProviderSelect={setSelectedProvider}
        onApiKeyChange={setApiKey}
        onToggleApiKeyVisibility={() => handleToggleApiKeyVisibility("new")}
        onSubmit={handleAddIntegration}
      />

      {integrations.length > 0 && (
        <IntegrationsList
          integrations={integrations}
          providers={mockProviders}
          showApiKey={showApiKey}
          onToggleApiKeyVisibility={handleToggleApiKeyVisibility}
          onRemove={handleRemoveIntegration}
        />
      )}
    </div>
  );
}
