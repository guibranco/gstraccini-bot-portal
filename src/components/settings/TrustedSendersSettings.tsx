import { ReactNode, useState } from 'react';
import { SettingsCard } from './SettingsCard';
import { TokenSelect } from '../TokenSelect';
import { Bot, Plus, Trash2 } from 'lucide-react';

interface TrustedSender {
  login: string;
  name?: string;
  avatar_url: string;
  added_at: string;
}

interface TrustedSendersSettingsProps {
  icon: ReactNode;
  trustedSenders: TrustedSender[];
  onAdd: (login: string) => void;
  onRemove: (login: string) => void;
}

const defaultTrustedSenders: TrustedSender[] = [
  {
    login: 'dependabot[bot]',
    name: 'Dependabot',
    avatar_url: 'https://github.com/dependabot.png',
    added_at: '2024-01-01T00:00:00Z'
  },
  {
    login: 'depfu[bot]',
    name: 'Depfu',
    avatar_url: 'https://github.com/depfu.png',
    added_at: '2024-01-01T00:00:00Z'
  }
];

export function TrustedSendersSettings({ icon, trustedSenders, onAdd, onRemove }: TrustedSendersSettingsProps) {
  const [newSenderLogin, setNewSenderLogin] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newSenderLogin) return;
    setIsAdding(true);
    try {
      await onAdd(newSenderLogin);
      setNewSenderLogin('');
    } finally {
      setIsAdding(false);
    }
  };

  const allTrustedSenders = [...defaultTrustedSenders, ...trustedSenders];

  return (
    <SettingsCard
      title="Trusted Pull Request Senders"
      icon={icon}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Pull requests from these senders will be automatically reviewed and merged if all checks pass.
        </p>

        {/* Add New Sender */}
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label htmlFor="new_sender" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Add New Trusted Sender
            </label>
            <input
              type="text"
              id="new_sender"
              placeholder="Enter GitHub username"
              value={newSenderLogin}
              onChange={(e) => setNewSenderLogin(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!newSenderLogin || isAdding}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>

        {/* Trusted Senders List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {allTrustedSenders.map((sender) => (
            <div key={sender.login} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={sender.avatar_url}
                  alt={sender.name || sender.login}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sender.name || sender.login}
                    </span>
                    {sender.login.endsWith('[bot]') && (
                      <Bot className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{sender.login}
                    <span className="mx-2">•</span>
                    Added {new Date(sender.added_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(sender.login)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </SettingsCard>
  );
}