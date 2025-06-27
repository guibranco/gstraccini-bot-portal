import { ReactNode } from 'react';
import { SettingsCard } from './SettingsCard';
import { SettingToggle } from './SettingToggle';
import type { DependabotFrequency, RepositorySettings } from '../../types';

interface RepositorySettingsProps {
  icon: ReactNode;
  settings: RepositorySettings;
  onChange: (key: keyof RepositorySettings, value: boolean | DependabotFrequency) => void;
}

export function RepositorySettings({ icon, settings, onChange }: RepositorySettingsProps) {
  const handleMainRulesetChange = (checked: boolean) => {
    onChange('createMainBranchRuleset', checked);
    onChange('rulesetBotChecks', checked);
    onChange('rulesetUpdatedBranch', checked);
    onChange('rulesetRequiredReviewers', checked);
    onChange('rulesetResolveConversations', checked);
  };

  const isAllRulesetOptionsEnabled = 
    settings.rulesetBotChecks &&
    settings.rulesetUpdatedBranch &&
    settings.rulesetRequiredReviewers &&
    settings.rulesetResolveConversations;

  return (
    <SettingsCard
      title="Repository Settings"
      icon={icon}
    >
      <div className="space-y-6">
        <SettingToggle
          id="create_labels"
          label="Create labels on new repository"
          description="Automatically create labels on new repositories"
          checked={settings.createLabels}
          onChange={(checked) => onChange('createLabels', checked)}
        />

        <div className="space-y-4">
          <SettingToggle
            id="create_main_branch_ruleset"
            label="Create main branch protection ruleset"
            description="Automatically create a ruleset for the main branch with security and code review requirements"
            checked={settings.createMainBranchRuleset}
            onChange={handleMainRulesetChange}
            forceActive={isAllRulesetOptionsEnabled}
          />

          <div className="ml-8 space-y-4">
            <SettingToggle
              id="ruleset_bot_checks"
              label="Require bot check runs"
              description="Require all bot check runs to pass before merging"
              checked={settings.rulesetBotChecks}
              onChange={(checked) => onChange('rulesetBotChecks', checked)}
              disabled={!settings.createMainBranchRuleset}
            />

            <SettingToggle
              id="ruleset_updated_branch"
              label="Require updated branch"
              description="Ensure the branch is up to date with the main branch before merging"
              checked={settings.rulesetUpdatedBranch}
              onChange={(checked) => onChange('rulesetUpdatedBranch', checked)}
              disabled={!settings.createMainBranchRuleset}
            />

            <SettingToggle
              id="ruleset_required_reviewers"
              label="Require reviewers"
              description="Require at least one approved review before merging"
              checked={settings.rulesetRequiredReviewers}
              onChange={(checked) => onChange('rulesetRequiredReviewers', checked)}
              disabled={!settings.createMainBranchRuleset}
            />

            <SettingToggle
              id="ruleset_resolve_conversations"
              label="Resolve conversations"
              description="Require all conversations to be resolved before merging"
              checked={settings.rulesetResolveConversations}
              onChange={(checked) => onChange('rulesetResolveConversations', checked)}
              disabled={!settings.createMainBranchRuleset}
            />
          </div>
        </div>

        <div className="space-y-4">
          <SettingToggle
            id="create_dependabot_file"
            label="Create Dependabot configuration"
            description="Automatically create dependabot.yml file for detected technologies"
            checked={settings.createDependabotFile}
            onChange={(checked) => onChange('createDependabotFile', checked)}
          />

          {settings.createDependabotFile && (
            <div className="ml-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Update Frequency
              </label>
              <select
                value={settings.dependabotFrequency}
                onChange={(e) => onChange('dependabotFrequency', e.target.value as DependabotFrequency)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
        </div>

        <SettingToggle
          id="create_secrets_workflow"
          label="Create secrets scanning workflow"
          description="Automatically create GitHub Actions workflow for secrets scanning using Infisical"
          checked={settings.createSecretsWorkflow}
          onChange={(checked) => onChange('createSecretsWorkflow', checked)}
        />

        <SettingToggle
          id="create_linters_workflow"
          label="Create linters workflow"
          description="Automatically create GitHub Actions workflow for linting based on repository technology"
          checked={settings.createLintersWorkflow}
          onChange={(checked) => onChange('createLintersWorkflow', checked)}
        />
      </div>
    </SettingsCard>
  );
}