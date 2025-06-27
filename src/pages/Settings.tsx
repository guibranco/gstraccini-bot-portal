import { useState, useCallback } from 'react';
import { Settings as SettingsIcon, FolderOpen, AlertCircle, GitPullRequest, Users, Cable } from 'lucide-react';
import { RepositorySettings } from '../components/settings/RepositorySettings';
import { IssuesSettings } from '../components/settings/IssuesSettings';
import { PullRequestsSettings } from '../components/settings/PullRequestsSettings';
import { TrustedSendersSettings } from '../components/settings/TrustedSendersSettings';
import { IntegrationsSettings } from '../components/settings/IntegrationsSettings';
import type { Integration, TrustedSender, DependabotFrequency, RepositorySettings as RepoSettings } from '../types';

interface Settings {
  repository: RepoSettings;
  notifyIssues: boolean;
  requireAcceptanceCriteriaChecklist: boolean;
  reminderIssues: boolean;
  reminderIssuesDays: number;
  prTemplateDescription: boolean;
  autoReviewPr: boolean;
  autoMergePr: boolean;
  createIssue: boolean;
  notifyPullRequests: boolean;
  integrations: {
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
}

export function Settings() {
  const [settings, setSettings] = useState<Settings>({
    repository: {
      createLabels: true,
      createMainBranchRuleset: true,
      rulesetBotChecks: true,
      rulesetUpdatedBranch: true,
      rulesetRequiredReviewers: true,
      rulesetResolveConversations: true,
      createDependabotFile: true,
      dependabotFrequency: 'weekly',
      createSecretsWorkflow: true,
      createLintersWorkflow: true
    },
    notifyIssues: true,
    requireAcceptanceCriteriaChecklist: true,
    reminderIssues: true,
    reminderIssuesDays: 10,
    prTemplateDescription: true,
    autoReviewPr: true,
    autoMergePr: true,
    createIssue: true,
    notifyPullRequests: true,
    integrations: {
      sonarcloud: {
        autoAnalyze: true,
        qualityGate: true,
        blockMerge: true
      },
      codacy: {
        autoAnalyze: true,
        qualityGate: true,
        blockMerge: true
      },
      codecov: {
        autoAnalyze: true,
        coverageThreshold: 80,
        blockMerge: true
      },
      snyk: {
        autoScan: true,
        blockHighVulnerabilities: true,
        blockMerge: true
      },
      openai: {
        autoReview: true,
        suggestFixes: true,
        improveDescription: true
      }
    }
  });

  const [trustedSenders, setTrustedSenders] = useState<TrustedSender[]>([
    {
      login: 'johndoe',
      name: 'John Doe',
      avatar_url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
      added_at: '2024-03-01T00:00:00Z'
    }
  ]);

  const [integrations] = useState<Integration[]>([
    {
      provider: 'SonarCloud',
      apiKey: 'sonar_12345678901234567890',
      status: 'Active',
      lastUsage: '2024-03-15T10:30:00Z',
      lastError: 'N/A'
    }
  ]);

  const [successMessage, setSuccessMessage] = useState('');

  const showSuccessMessage = useCallback((message: string = 'Settings updated successfully') => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  }, []);

  const handleRepositorySettingChange = useCallback(async (key: keyof RepoSettings, value: boolean | DependabotFrequency) => {
    setSettings(prev => ({
      ...prev,
      repository: {
        ...prev.repository,
        [key]: value
      }
    }));
    
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccessMessage();
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [showSuccessMessage]);

  const handleSettingChange = useCallback(async (key: keyof Settings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccessMessage();
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [showSuccessMessage]);

  const handleIntegrationSettingChange = useCallback(async (integration: string, key: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: {
          ...prev.integrations[integration as keyof Settings['integrations']],
          [key]: value
        }
      }
    }));

    try {
      // Simulate API call to save integration settings
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccessMessage(`${integration} settings updated`);
    } catch (error) {
      console.error('Failed to save integration settings:', error);
    }
  }, [showSuccessMessage]);

  const handleAddTrustedSender = useCallback(async (login: string) => {
    try {
      // Simulate API call to get user info and save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSender: TrustedSender = {
        login,
        name: login,
        avatar_url: `https://github.com/${login}.png`,
        added_at: new Date().toISOString()
      };
      
      setTrustedSenders(prev => [...prev, newSender]);
      showSuccessMessage('Trusted sender added successfully');
    } catch (error) {
      console.error('Failed to add trusted sender:', error);
    }
  }, [showSuccessMessage]);

  const handleRemoveTrustedSender = useCallback(async (login: string) => {
    try {
      // Simulate API call to remove trusted sender
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTrustedSenders(prev => prev.filter(sender => sender.login !== login));
      showSuccessMessage('Trusted sender removed successfully');
    } catch (error) {
      console.error('Failed to remove trusted sender:', error);
    }
  }, [showSuccessMessage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <SettingsIcon className="w-8 h-8 text-gray-400" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your application settings</p>
        </div>
      </div>

      {successMessage && (
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200">{successMessage}</p>
        </div>
      )}

      <div className="space-y-8">
        <RepositorySettings
          icon={<FolderOpen className="w-6 h-6" />}
          settings={settings.repository}
          onChange={handleRepositorySettingChange}
        />

        <IssuesSettings
          icon={<AlertCircle className="w-6 h-6" />}
          settings={settings}
          onChange={handleSettingChange}
        />

        <PullRequestsSettings
          icon={<GitPullRequest className="w-6 h-6" />}
          settings={settings}
          onChange={handleSettingChange}
        />

        <TrustedSendersSettings
          icon={<Users className="w-6 h-6" />}
          trustedSenders={trustedSenders}
          onAdd={handleAddTrustedSender}
          onRemove={handleRemoveTrustedSender}
        />

        <IntegrationsSettings
          icon={<Cable className="w-6 h-6" />}
          integrations={integrations}
          settings={settings.integrations}
          onChange={handleIntegrationSettingChange}
        />
      </div>
    </div>
  );
}