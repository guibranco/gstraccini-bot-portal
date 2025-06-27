import { PendingAction } from '../types';
import { AlertCircle, CheckCircle2, GitMerge, FileEdit, MessageCircle } from 'lucide-react';

interface PendingActionsProps {
  actions: PendingAction[];
}

const getActionIcon = (type: PendingAction['type']) => {
  switch (type) {
    case 'review_pr':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'close_issue':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'merge_pr':
      return <GitMerge className="w-5 h-5 text-purple-500" />;
    case 'update_readme':
      return <FileEdit className="w-5 h-5 text-blue-500" />;
    case 'respond_issue':
      return <MessageCircle className="w-5 h-5 text-orange-500" />;
  }
};

const getPriorityColor = (priority: PendingAction['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
  }
};

export function PendingActions({ actions }: PendingActionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Actions</h3>
      <div className="space-y-4">
        {actions.map((action) => (
          <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getActionIcon(action.type)}
              <div>
                <p className="text-gray-800">{action.description}</p>
                <p className="text-sm text-gray-500">{action.repository}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(action.priority)}`}>
              {action.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}