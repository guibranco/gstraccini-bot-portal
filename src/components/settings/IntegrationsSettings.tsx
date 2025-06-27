import { ReactNode } from 'react';
import { Cable } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { SettingToggle } from './SettingToggle';
import type { Integration } from '../../types';

interface IntegrationsSettingsProps {
  icon: ReactNode;
  integrations: Integration[];
  settings: {
    sonarcloud: {
      autoAnalyze: boolean;
      qualityGate: boolean;
      blockMerge: boolean;
    };
    codacy: {
      autoAnalyze: boolean;
      qualityGate: boolean;
      blockMerge: boolean;
    };
    codecov: {
      autoAnalyze: boolean;
      coverageThreshold: number;
      blockMerge: boolean;
    };
    snyk: {
      autoScan: boolean;
      blockHighVulnerabilities: boolean;
      blockMerge: boolean;
    };
    openai: {
      autoReview: boolean;
      suggestFixes: boolean;
      improveDescription: boolean;
    };
  };
  onChange: (integration: string, key: string, value: boolean | number) => void;
}

export function IntegrationsSettings({ icon, integrations, settings, onChange }: IntegrationsSettingsProps) {
  const hasIntegration = (provider: string) => 
    integrations.some(i => i.provider === provider && i.status === 'Active');

  return (
    <SettingsCard
      title="Integration Settings"
      icon={icon}
    >
      <div className="space-y-8">
        {/* SonarCloud Settings */}
        {hasIntegration('SonarCloud') && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">SonarCloud</h3>
            <SettingToggle
              id="sonarcloud_auto_analyze"
              label="Automatic Analysis"
              description="Automatically analyze pull requests when they are created or updated"
              checked={settings.sonarcloud.autoAnalyze}
              onChange={(checked) => onChange('sonarcloud', 'autoAnalyze', checked)}
            />
            <SettingToggle
              id="sonarcloud_quality_gate"
              label="Quality Gate Check"
              description="Check quality gate status on pull requests"
              checked={settings.sonarcloud.qualityGate}
              onChange={(checked) => onChange('sonarcloud', 'qualityGate', checked)}
            />
            <SettingToggle
              id="sonarcloud_block_merge"
              label="Block Merge on Failed Quality Gate"
              description="Prevent merging pull requests that don't pass the quality gate"
              checked={settings.sonarcloud.blockMerge}
              onChange={(checked) => onChange('sonarcloud', 'blockMerge', checked)}
            />
          </div>
        )}

        {/* Codacy Settings */}
        {hasIntegration('Codacy') && (
          <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Codacy</h3>
            <SettingToggle
              id="codacy_auto_analyze"
              label="Automatic Analysis"
              description="Automatically analyze pull requests when they are created or updated"
              checked={settings.codacy.autoAnalyze}
              onChange={(checked) => onChange('codacy', 'autoAnalyze', checked)}
            />
            <SettingToggle
              id="codacy_quality_gate"
              label="Quality Gate Check"
              description="Check quality gate status on pull requests"
              checked={settings.codacy.qualityGate}
              onChange={(checked) => onChange('codacy', 'qualityGate', checked)}
            />
            <SettingToggle
              id="codacy_block_merge"
              label="Block Merge on Failed Quality Gate"
              description="Prevent merging pull requests that don't pass the quality gate"
              checked={settings.codacy.blockMerge}
              onChange={(checked) => onChange('codacy', 'blockMerge', checked)}
            />
          </div>
        )}

        {/* Codecov Settings */}
        {hasIntegration('Codecov') && (
          <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Codecov</h3>
            <SettingToggle
              id="codecov_auto_analyze"
              label="Automatic Analysis"
              description="Automatically analyze coverage on pull requests"
              checked={settings.codecov.autoAnalyze}
              onChange={(checked) => onChange('codecov', 'autoAnalyze', checked)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Coverage Threshold
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.codecov.coverageThreshold}
                  onChange={(e) => onChange('codecov', 'coverageThreshold', parseInt(e.target.value, 10))}
                  className="w-20 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-500 dark:text-gray-400">%</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Minimum coverage percentage required for pull requests
              </p>
            </div>
            <SettingToggle
              id="codecov_block_merge"
              label="Block Merge on Low Coverage"
              description="Prevent merging pull requests that don't meet the coverage threshold"
              checked={settings.codecov.blockMerge}
              onChange={(checked) => onChange('codecov', 'blockMerge', checked)}
            />
          </div>
        )}

        {/* Snyk Settings */}
        {hasIntegration('Snyk') && (
          <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Snyk</h3>
            <SettingToggle
              id="snyk_auto_scan"
              label="Automatic Vulnerability Scanning"
              description="Automatically scan pull requests for security vulnerabilities"
              checked={settings.snyk.autoScan}
              onChange={(checked) => onChange('snyk', 'autoScan', checked)}
            />
            <SettingToggle
              id="snyk_block_high_vulnerabilities"
              label="Block High Severity Vulnerabilities"
              description="Block pull requests with high severity vulnerabilities"
              checked={settings.snyk.blockHighVulnerabilities}
              onChange={(checked) => onChange('snyk', 'blockHighVulnerabilities', checked)}
            />
            <SettingToggle
              id="snyk_block_merge"
              label="Block Merge on Vulnerabilities"
              description="Prevent merging pull requests with security vulnerabilities"
              checked={settings.snyk.blockMerge}
              onChange={(checked) => onChange('snyk', 'blockMerge', checked)}
            />
          </div>
        )}

        {/* OpenAI Settings */}
        {hasIntegration('OpenAI') && (
          <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">OpenAI</h3>
            <SettingToggle
              id="openai_auto_review"
              label="Automatic Code Review"
              description="Automatically review pull requests using AI"
              checked={settings.openai.autoReview}
              onChange={(checked) => onChange('openai', 'autoReview', checked)}
            />
            <SettingToggle
              id="openai_suggest_fixes"
              label="Suggest Code Fixes"
              description="Suggest code improvements and bug fixes"
              checked={settings.openai.suggestFixes}
              onChange={(checked) => onChange('openai', 'suggestFixes', checked)}
            />
            <SettingToggle
              id="openai_improve_description"
              label="Improve PR Description"
              description="Automatically enhance pull request descriptions"
              checked={settings.openai.improveDescription}
              onChange={(checked) => onChange('openai', 'improveDescription', checked)}
            />
          </div>
        )}

        {integrations.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No active integrations found. Add integrations in the{' '}
            <a href="/integrations" className="text-blue-600 dark:text-blue-400 hover:underline">
              Integrations page
            </a>
            .
          </div>
        )}
      </div>
    </SettingsCard>
  );
}