import { PullRequest } from '../types';
import { GitPullRequest, CheckCircle, XCircle, Clock, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PullRequestsListProps {
  pullRequests: PullRequest[];
}

const getStateIcon = (state: PullRequest['state']) => {
  switch (state) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'failure':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case 'skipped':
      return <ArrowRight className="w-5 h-5 text-gray-500" />;
    default:
      return <HelpCircle className="w-5 h-5 text-gray-400" />;
  }
};

const getStateClass = (state: PullRequest['state']) => {
  switch (state) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'failure':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'skipped':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function PullRequestsList({ pullRequests }: PullRequestsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Assigned Pull Requests</h3>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          {pullRequests.length}
        </span>
      </div>
      <div className="space-y-4">
        {pullRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No pull requests found</p>
        ) : (
          pullRequests.map((pr, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <GitPullRequest className="w-5 h-5 text-purple-500 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={pr.sender.avatar_url}
                        alt={pr.sender.name || pr.sender.login}
                        className="w-6 h-6 rounded-full"
                      />
                      <a
                        href={pr.sender.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        {pr.sender.name || pr.sender.login}
                      </a>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStateClass(pr.state)}`}>
                      {getStateIcon(pr.state)}
                      {pr.state}
                    </span>
                  </div>
                  <Link
                    to={`/pull-requests/${pr.url.split('/').pop()}`}
                    className="text-blue-600 hover:text-blue-800 font-medium block mt-2"
                  >
                    {pr.title}
                  </Link>
                  <div className="mt-1 text-sm">
                    <Link
                      to={`/repositories/${pr.full_name}`}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {pr.repository}
                    </Link>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500">
                      {new Date(pr.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {pr.labels && pr.labels.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {pr.labels.map((label) => (
                        <span
                          key={label.name}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `#${label.color}`,
                            color: luminance(label.color)
                          }}
                          title={label.description}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function luminance(color: string): string {
  if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
    throw new Error('Invalid color format. Expected 6-digit hex color.');
  }
  const red = parseInt(color.slice(0, 2), 16);
  const green = parseInt(color.slice(2, 2), 16);
  const blue = parseInt(color.slice(4, 2), 16);
  const yiq = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
  return yiq >= 128 ? '#000' : '#fff';
}