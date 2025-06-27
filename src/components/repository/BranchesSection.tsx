import { GitBranch, Shield } from 'lucide-react';
import type { Branch } from '../../types';

interface BranchesSectionProps {
  branches: Branch[];
  defaultBranch: string;
}

export function BranchesSection({ branches = [], defaultBranch }: BranchesSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <GitBranch className="w-5 h-5 mr-2" />
            Branches ({branches.length})
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Default: {defaultBranch}
          </span>
        </div>
        <div className="space-y-3">
          {branches.map(branch => (
            <div
              key={branch.name}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {branch.name}
                </span>
                {branch.protected && (
                  <Shield className="w-4 h-4 text-green-500" />
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last commit: {new Date(branch.last_commit).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}