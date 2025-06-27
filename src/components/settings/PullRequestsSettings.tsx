import { ReactNode } from 'react';
import { SettingsCard } from './SettingsCard';
import { SettingToggle } from './SettingToggle';

interface PullRequestsSettingsProps {
  icon: ReactNode;
  settings: {
    prTemplateDescription: boolean;
    autoReviewPr: boolean;
    autoMergePr: boolean;
    createIssue: boolean;
    notifyPullRequests: boolean;
  };
  onChange: (key: string, value: boolean | number) => void;
}

export function PullRequestsSettings({ icon, settings, onChange }: PullRequestsSettingsProps) {
  return (
    <SettingsCard
      title="Pull Requests Settings"
      icon={icon}
    >
      <div className="space-y-6">
        <SettingToggle
          id="pr_template_description"
          label="Add PR description from template"
          description="Automatically add a description to pull requests based on a predefined template"
          note="This action will only be applied if the pull request description is empty"
          checked={settings.prTemplateDescription}
          onChange={(checked) => onChange('prTemplateDescription', checked)}
        />

        <SettingToggle
          id="auto_review_pr"
          label="Auto Approval Pull Request"
          description="Automatically approve the pull request if no issues are found"
          checked={settings.autoReviewPr}
          onChange={(checked) => onChange('autoReviewPr', checked)}
        />

        <SettingToggle
          id="auto_merge_pr"
          label="Enable Auto-Merge"
          description="Automatically merge pull requests when all checks pass from trusted senders"
          checked={settings.autoMergePr}
          onChange={(checked) => onChange('autoMergePr', checked)}
        />

        <SettingToggle
          id="create_issue"
          label="Create issues for pending tasks in code comments"
          description="Automatically create issues for specific keywords found in pull request content"
          badges={[
            { text: 'Fixme', icon: 'wrench' },
            { text: 'Todo', icon: 'tasks' },
            { text: 'Bug', icon: 'bug' }
          ]}
          checked={settings.createIssue}
          onChange={(checked) => onChange('createIssue', checked)}
        />

        <SettingToggle
          id="notify_pull_requests"
          label="Pull Requests Notification"
          description="Notify me when new pull requests are created"
          checked={settings.notifyPullRequests}
          onChange={(checked) => onChange('notifyPullRequests', checked)}
        />
      </div>
    </SettingsCard>
  );
}