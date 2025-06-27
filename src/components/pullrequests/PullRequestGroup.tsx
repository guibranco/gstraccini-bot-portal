import { ChevronDown } from 'lucide-react';
import { PullRequestItem } from './PullRequestItem';
import type { PullRequest } from '../../types';

interface PullRequestGroupProps {
  owner: string;
  pullRequests: PullRequest[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function PullRequestGroup({
  owner,
  pullRequests,
  isExpanded,
  onToggle
}: PullRequestGroupProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          {owner}
          <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            ({pullRequests.length})
          </span>
        </h2>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {pullRequests.map((pr) => (
            <PullRequestItem key={pr.url} pullRequest={pr} />
          ))}
        </div>
      )}
    </div>
  );
}