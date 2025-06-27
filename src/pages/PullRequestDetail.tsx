import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  GitPullRequest,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Terminal,
  FileText,
  GitCommit,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CheckRunDiagram } from '../components/pullrequest/CheckRunDiagram';
import { WorkflowRunDiagram } from '../components/pullrequest/WorkflowRunDiagram';

interface PullRequestDetail {
  id: string;
  title: string;
  author: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  description: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
  requested_reviewers: Array<{
    login: string;
    avatar_url: string;
  }>;
  reviews: Array<{
    user: {
      login: string;
      avatar_url: string;
    };
    state: 'approved' | 'changes_requested' | 'commented';
    submitted_at: string;
  }>;
  commands: Array<{
    command: string;
    timestamp: string;
  }>;
  files: Array<{
    name: string;
    status: 'added' | 'modified' | 'removed';
  }>;
  commits: Array<{
    sha: string;
    message: string;
    author: {
      login: string;
    };
  }>;
  checks: {
    general: Array<{
      name: string;
      status: 'success' | 'failure' | 'pending';
    }>;
    bot: Array<{
      name: string;
      status: 'success' | 'failure' | 'pending';
    }>;
  };
}

// Mock data for demonstration
const mockPullRequest: PullRequestDetail = {
  id: '1234',
  title: 'Fix the issue with X',
  author: {
    login: 'johndoe',
    avatar_url: 'https://github.com/johndoe.png'
  },
  created_at: '2024-03-15T10:30:00Z',
  description: 'This PR fixes the issue with X, improves Y, and ensures Z.',
  labels: [
    { name: 'bug', color: '3b82f6' },
    { name: 'needs-review', color: 'eab308' }
  ],
  requested_reviewers: [
    { login: 'alice', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { login: 'bob', avatar_url: 'https://github.com/bob.png' }
  ],
  reviews: [
    { 
      user: { login: 'alice', avatar_url: 'https://github.com/alice.png' },
      state: 'approved',
      submitted_at: '2024-03-15T11:30:00Z'
    },
    {
      user: { login: 'bob', avatar_url: 'https://github.com/bob.png' },
      state: 'changes_requested',
      submitted_at: '2024-03-15T12:00:00Z'
    }
  ],
  commands: [
    { command: '/retest', timestamp: '2024-03-15T12:30:00Z' },
    { command: '/merge', timestamp: '2024-03-15T13:00:00Z' }
  ],
  files: [
    { name: 'src/components/App.tsx', status: 'modified' },
    { name: 'src/utils/helpers.ts', status: 'added' },
    { name: 'README.md', status: 'modified' }
  ],
  commits: [
    { sha: 'abc123', message: 'Initial commit fixing issue X', author: { login: 'johndoe' } },
    { sha: 'def456', message: 'Refactored file Y', author: { login: 'alice' } }
  ],
  checks: {
    general: [
      { name: 'CI/CD', status: 'success' },
      { name: 'Lint', status: 'success' },
      { name: 'Unit Tests', status: 'failure' }
    ],
    bot: [
      { name: 'Check Commit', status: 'success' },
      { name: 'Check Pull Request', status: 'success' },
      { name: 'Check Pull Request Description', status: 'success' },
      { name: 'Check Pull Request Content', status: 'failure' },
      { name: 'Check Pull Request Size', status: 'pending' }
    ]
  }
};

const mockCheckRunEvents: Event[] = [
  {
    delivery_id: 'check1',
    type: 'check_run',
    action: 'created',
    date: '2024-03-15T10:35:00Z',
    payload: {
      check_run: {
        name: 'SonarCloud Code Analysis',
        app: {
          id: 'sonarcloud',
          name: 'SonarCloud'
        },
        conclusion: null,
        status: 'queued'
      },
      sender: {
        login: 'sonarcloud[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/ml/1581?s=82&v=4'
      }
    }
  },
  {
    delivery_id: 'check2',
    type: 'check_run',
    action: 'in_progress',
    date: '2024-03-15T10:36:00Z',
    payload: {
      check_run: {
        name: 'SonarCloud Code Analysis',
        app: {
          id: 'sonarcloud',
          name: 'SonarCloud'
        },
        conclusion: null,
        status: 'in_progress'
      },
      sender: {
        login: 'sonarcloud[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/ml/1581?s=82&v=4'
      }
    }
  },
  {
    delivery_id: 'check3',
    type: 'check_run',
    action: 'completed',
    date: '2024-03-15T10:40:00Z',
    payload: {
      check_run: {
        name: 'SonarCloud Code Analysis',
        app: {
          id: 'sonarcloud',
          name: 'SonarCloud'
        },
        conclusion: 'success',
        status: 'completed'
      },
      sender: {
        login: 'sonarcloud[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/ml/1581?s=82&v=4'
      }
    }
  },
  {
    delivery_id: 'check4',
    type: 'check_run',
    action: 'created',
    date: '2024-03-15T10:41:00Z',
    payload: {
      check_run: {
        name: 'Snyk Security Scan',
        app: {
          id: 'snyk',
          name: 'Snyk'
        },
        conclusion: null,
        status: 'queued'
      },
      sender: {
        login: 'snyk[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/23347?s=48&u=4f40f857a88bf3c2849770799b3ff765242ecfce&v=4'
      }
    }
  },
  {
    delivery_id: 'check5',
    type: 'check_run',
    action: 'completed',
    date: '2024-03-15T10:45:00Z',
    payload: {
      check_run: {
        name: 'Snyk Security Scan',
        app: {
          id: 'snyk',
          name: 'Snyk'
        },
        conclusion: 'failure',
        status: 'completed'
      },
      sender: {
        login: 'snyk[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/23347?s=48&u=4f40f857a88bf3c2849770799b3ff765242ecfce&v=4'
      }
    }
  },
  {
    delivery_id: 'check6',
    type: 'check_run',
    action: 'created',
    date: '2024-03-15T10:46:00Z',
    payload: {
      check_run: {
        name: 'Codecov Coverage',
        app: {
          id: 'codecov',
          name: 'Codecov'
        },
        conclusion: null,
        status: 'queued'
      },
      sender: {
        login: 'codecov[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/254?s=30&u=c392dd7c2afc51fe2347d4296afa8494ac05772e&v=4'
      }
    }
  },
  {
    delivery_id: 'check7',
    type: 'check_run',
    action: 'completed',
    date: '2024-03-15T10:48:00Z',
    payload: {
      check_run: {
        name: 'Codecov Coverage',
        app: {
          id: 'codecov',
          name: 'Codecov'
        },
        conclusion: 'success',
        status: 'completed'
      },
      sender: {
        login: 'codecov[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/254?s=30&u=c392dd7c2afc51fe2347d4296afa8494ac05772e&v=4'
      }
    }
  }
];

const mockWorkflowEvents: Event[] = [
  {
    delivery_id: 'workflow1',
    type: 'workflow_run',
    action: 'requested',
    date: '2024-03-15T10:31:00Z',
    payload: {
      workflow_run: {
        name: 'CI Pipeline',
        app: {
          id: 'github-actions',
          name: 'GitHub Actions'
        },
        status: 'queued'
      },
      sender: {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/57789?v=4'
      }
    }
  },
  {
    delivery_id: 'workflow2',
    type: 'workflow_run',
    action: 'in_progress',
    date: '2024-03-15T10:32:00Z',
    payload: {
      workflow_run: {
        name: 'CI Pipeline',
        app: {
          id: 'github-actions',
          name: 'GitHub Actions'
        },
        status: 'in_progress'
      },
      sender: {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/57789?v=4'
      }
    }
  },
  {
    delivery_id: 'workflow3',
    type: 'workflow_run',
    action: 'completed',
    date: '2024-03-15T10:35:00Z',
    payload: {
      workflow_run: {
        name: 'CI Pipeline',
        app: {
          id: 'github-actions',
          name: 'GitHub Actions'
        },
        conclusion: 'success',
        status: 'completed'
      },
      sender: {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/57789?v=4'
      }
    }
  },
  {
    delivery_id: 'workflow4',
    type: 'workflow_run',
    action: 'requested',
    date: '2024-03-15T10:36:00Z',
    payload: {
      workflow_run: {
        name: 'Deploy Preview',
        app: {
          id: 'github-actions',
          name: 'GitHub Actions'
        },
        status: 'queued'
      },
      sender: {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/57789?v=4'
      }
    }
  },
  {
    delivery_id: 'workflow5',
    type: 'workflow_run',
    action: 'in_progress',
    date: '2024-03-15T10:37:00Z',
    payload: {
      workflow_run: {
        name: 'Deploy Preview',
        app: {
          id: 'github-actions',
          name: 'GitHub Actions'
        },
        status: 'in_progress'
      },
      sender: {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/57789?v=4'
      }
    }
  },
  {
    delivery_id: 'workflow6',
    type: 'workflow_run',
    action: 'completed',
    date: '2024-03-15T10:40:00Z',
    payload: {
      workflow_run: {
        name: 'Deploy Preview',
        app: {
          id: 'github-actions',
          name: 'GitHub Actions'
        },
        conclusion: 'success',
        status: 'completed'
      },
      sender: {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/57789?v=4'
      }
    }
  }
];

const StatusIcon = ({ status }: { status: 'success' | 'failure' | 'pending' }) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'failure':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />;
  }
};

const ReviewStateIcon = ({ state }: { state: 'approved' | 'changes_requested' | 'commented' }) => {
  switch (state) {
    case 'approved':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'changes_requested':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
  }
};

export function PullRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const [pr] = useState<PullRequestDetail>(mockPullRequest);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/pull-requests"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Pull Requests
      </Link>

      {/* Pull Request Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <GitPullRequest className="w-6 h-6 text-purple-500" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  #{id} - {pr.title}
                </h1>
                <a
                  href={`https://github.com/org/repo/pull/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="View on GitHub"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-2 flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <img
                  src={pr.author.avatar_url}
                  alt={pr.author.login}
                  className="w-6 h-6 rounded-full"
                />
                <span>
                  Opened by <strong>@{pr.author.login}</strong> on{' '}
                  {new Date(pr.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{pr.description}</p>
          </div>

          {/* Labels */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Labels</h2>
            <div className="flex flex-wrap gap-2">
              {pr.labels.map(label => (
                <span
                  key={label.name}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `#${label.color}20`,
                    color: `#${label.color}`
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>

          {/* Requested Reviewers */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Requested Reviewers
            </h2>
            <div className="space-y-2">
              {pr.requested_reviewers.map(reviewer => (
                <div key={reviewer.login} className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <img
                    src={reviewer.avatar_url}
                    alt={reviewer.login}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-600 dark:text-gray-300">@{reviewer.login}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Reviews</h2>
            <div className="space-y-2">
              {pr.reviews.map((review, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <ReviewStateIcon state={review.state} />
                  <img
                    src={review.user.avatar_url}
                    alt={review.user.login}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    @{review.user.login} ({review.state.replace('_', ' ')})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Commands */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Commands</h2>
            <div className="space-y-2">
              {pr.commands.map((cmd, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <Terminal className="w-5 h-5" />
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {cmd.command}
                  </code>
                  <span className="text-sm">
                    {new Date(cmd.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Files Changed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Files Changed</h2>
          <div className="space-y-2">
            {pr.files.map(file => (
              <div key={file.name} className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{file.name}</span>
                <span className={`text-sm ${
                  file.status === 'added' ? 'text-green-500' :
                  file.status === 'removed' ? 'text-red-500' :
                  'text-yellow-500'
                }`}>
                  ({file.status})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commits */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Commits</h2>
          <div className="space-y-2">
            {pr.commits.map(commit => (
              <div key={commit.sha} className="flex items-center space-x-2">
                <GitCommit className="w-5 h-5 text-gray-400" />
                <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {commit.sha.substring(0, 7)}
                </code>
                <span className="text-gray-600 dark:text-gray-300">{commit.message}</span>
                <span className="text-gray-400">by @{commit.author.login}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Check Run Timeline */}
      <CheckRunDiagram events={mockCheckRunEvents} />

      {/* Workflow Run Timeline */}
      <WorkflowRunDiagram events={mockWorkflowEvents} />

      {/* Check Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Checks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Check Status (General)
            </h2>
            <div className="space-y-2">
              {pr.checks.general.map(check => (
                <div key={check.name} className="flex items-center space-x-2">
                  <StatusIcon status={check.status} />
                  <span className="text-gray-600 dark:text-gray-300">{check.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bot Checks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Check Status (Bot)
            </h2>
            <div className="space-y-2">
              {pr.checks.bot.map(check => (
                <div key={check.name} className="flex items-center space-x-2">
                  <StatusIcon status={check.status} />
                  <span className="text-gray-600 dark:text-gray-300">{check.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}