import { ReactNode } from 'react';
import { SettingsCard } from './SettingsCard';
import { SettingToggle } from './SettingToggle';

interface IssuesSettingsProps {
  icon: ReactNode;
  settings: {
    requireAcceptanceCriteriaChecklist: boolean;
    reminderIssues: boolean;
    reminderIssuesDays: number;
    notifyIssues: boolean;
  };
  onChange: (key: string, value: boolean | number) => void;
}

export function IssuesSettings({ icon, settings, onChange }: IssuesSettingsProps) {
  return (
    <SettingsCard
      title="Issues Settings"
      icon={icon}
    >
      <div className="space-y-6">
        <SettingToggle
          id="require_acceptance_criteria_checklist"
          label="Require Acceptance Criteria checklist"
          description="Requires issue description to have an acceptance criteria checklist section"
          checked={settings.requireAcceptanceCriteriaChecklist}
          onChange={(checked) => onChange('requireAcceptanceCriteriaChecklist', checked)}
        />

        <div className="space-y-2">
          <SettingToggle
            id="reminder_issues"
            label="Issues Reminder"
            description="Remind the assigned user when the issue has been inactive"
            checked={settings.reminderIssues}
            onChange={(checked) => onChange('reminderIssues', checked)}
          />
          {settings.reminderIssues && (
            <div className="ml-8 mt-2">
              <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                <span>Remind after</span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={settings.reminderIssuesDays}
                  onChange={(e) => onChange('reminderIssuesDays', parseInt(e.target.value, 10))}
                  className="w-16 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span>days of inactivity</span>
              </label>
            </div>
          )}
        </div>

        <SettingToggle
          id="notify_issues"
          label="Issues Notification"
          description="Notify me when new issues are created"
          checked={settings.notifyIssues}
          onChange={(checked) => onChange('notifyIssues', checked)}
        />
      </div>
    </SettingsCard>
  );
}