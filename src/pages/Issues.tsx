import { useState, useEffect } from 'react';
import { ChevronDown, CircleDot, Filter } from 'lucide-react';
import { TokenSelect } from '../components/TokenSelect';
import { Link } from 'react-router-dom';
import type { Issue } from '../types';

interface GroupedIssues {
  [owner: string]: Issue[];
}

interface Label {
  name: string;
  color: string;
  description?: string;
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

export function Issues() {
  const [isLoading, setIsLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [groupedIssues, setGroupedIssues] = useState<GroupedIssues>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedSenders, setSelectedSenders] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [allLabels, setAllLabels] = useState<Label[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchIssues = async () => {
      try {
        // In a real app, this would be an API call
        const mockIssues: Issue[] = [
          {
            url: 'https://github.com/org/repo1/issues/10',
            title: 'Bug: Server crashes under heavy load',
            repository: 'repo1',
            full_name: 'org/repo1',
            created_at: '2024-03-10T08:45:00Z',
            owner: 'Organization 1',
            labels: [
              { name: 'bug', color: 'dc3545', description: 'Something is not working' },
              { name: 'high-priority', color: 'ff9800', description: 'Needs immediate attention' }
            ],
            sender: {
              login: 'alice',
              name: 'Alice Johnson',
              avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              html_url: 'https://github.com/alice'
            }
          },
          {
            url: 'https://github.com/org/repo2/issues/11',
            title: 'Enhancement: Add dark mode support',
            repository: 'repo2',
            full_name: 'org/repo2',
            created_at: '2024-03-09T14:30:00Z',
            owner: 'Organization 1',
            labels: [
              { name: 'enhancement', color: '28a745', description: 'New feature or request' }
            ],
            sender: {
              login: 'bob',
              name: 'Bob Smith',
              avatar_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
              html_url: 'https://github.com/bob'
            }
          },
          {
            url: 'https://github.com/org2/repo3/issues/12',
            title: 'Feature Request: Email notifications',
            repository: 'repo3',
            full_name: 'org2/repo3',
            created_at: '2024-03-08T11:20:00Z',
            owner: 'Organization 2',
            labels: [
              { name: 'feature', color: '0d6efd', description: 'New feature request' },
              { name: 'documentation', color: '6f42c1', description: 'Documentation update' }
            ],
            sender: {
              login: 'carol',
              name: 'Carol Williams',
              avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
              html_url: 'https://github.com/carol'
            }
          }
        ];

        setIssues(mockIssues);
        
        // Extract unique labels
        const uniqueLabels = Array.from(
          new Set(
            mockIssues.flatMap(issue => issue.labels || [])
              .map(label => JSON.stringify(label))
          )
        ).map(str => JSON.parse(str));
        setAllLabels(uniqueLabels);
        
        // Filter issues
        const filteredIssues = mockIssues.filter(issue => {
          if (selectedOwners.length > 0 && !selectedOwners.includes(issue.owner || 'Unknown')) return false;
          if (selectedSenders.length > 0 && !selectedSenders.includes(issue.sender.login)) return false;
          if (selectedLabels.length > 0) {
            const issueLabels = issue.labels?.map(l => l.name) || [];
            if (!selectedLabels.some(label => issueLabels.includes(label))) return false;
          }
          return true;
        });

        // Group issues by owner
        const grouped = filteredIssues.reduce((acc, issue) => {
          const owner = issue.owner || 'Unknown';
          if (!acc[owner]) {
            acc[owner] = [];
          }
          acc[owner].push(issue);
          return acc;
        }, {} as GroupedIssues);
        
        setGroupedIssues(grouped);
        setExpandedGroups(new Set(Object.keys(grouped)));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, [selectedOwners, selectedSenders, selectedLabels]);

  const toggleGroup = (owner: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(owner)) {
        next.delete(owner);
      } else {
        next.add(owner);
      }
      return next;
    });
  };

  const ownerOptions = Array.from(new Set(issues.map(issue => issue.owner || 'Unknown'))).map(owner => ({
    value: owner,
    label: owner,
  }));

  const senderOptions = Array.from(
    new Set(issues.map(issue => issue.sender))
      .values()
  ).map(sender => ({
    value: sender.login,
    label: sender.name || sender.login,
    avatar: sender.avatar_url,
    description: `@${sender.login}`
  }));

  const clearFilters = () => {
    setSelectedOwners([]);
    setSelectedSenders([]);
    setSelectedLabels([]);
  };

  const hasActiveFilters = selectedOwners.length > 0 || selectedSenders.length > 0 || selectedLabels.length > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
            </div>
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {isFiltersExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>

          <div className={`grid gap-4 ${isFiltersExpanded ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {/* Owner Filter */}
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Owner
              </label>
              <TokenSelect
                options={ownerOptions}
                selectedValues={selectedOwners}
                onChange={setSelectedOwners}
                placeholder="Select owners..."
              />
            </div>

            {/* Sender Filter */}
            <div>
              <label htmlFor="sender" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Sender
              </label>
              <TokenSelect
                options={senderOptions}
                selectedValues={selectedSenders}
                onChange={setSelectedSenders}
                placeholder="Select senders..."
              />
            </div>

            {/* Labels Filter */}
            <div className={!isFiltersExpanded ? 'hidden' : ''}>
              <label htmlFor="labels" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Labels
              </label>
              <TokenSelect
                options={allLabels.map(label => ({
                  value: label.name,
                  label: label.name,
                  color: label.color
                }))}
                selectedValues={selectedLabels}
                onChange={setSelectedLabels}
                placeholder="Select labels..."
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Assigned Issues
          </h1>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-full text-sm font-medium">
            {Object.values(groupedIssues).reduce((acc, curr) => acc + curr.length, 0)}
          </span>
        </div>

        {Object.entries(groupedIssues).map(([owner, ownerIssues]) => (
          <div key={owner} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => toggleGroup(owner)}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                {owner}
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  ({ownerIssues.length})
                </span>
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedGroups.has(owner) ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {expandedGroups.has(owner) && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {ownerIssues.map((issue) => (
                  <div key={issue.url} className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <CircleDot className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={issue.sender.avatar_url}
                            alt={issue.sender.name || issue.sender.login}
                            className="w-6 h-6 rounded-full"
                          />
                          <a
                            href={issue.sender.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                          >
                            {issue.sender.name || issue.sender.login}
                          </a>
                        </div>
                        <a
                          href={issue.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                          {issue.title}
                        </a>
                        <div className="mt-1 text-sm">
                          <Link
                            to={`/repositories/${issue.full_name}`}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                          >
                            {issue.repository}
                          </Link>
                          <span className="text-gray-400 mx-2">•</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {new Date(issue.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {issue.labels && issue.labels.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {issue.labels.map((label) => (
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
                ))}
              </div>
            )}
          </div>
        ))}

        {Object.keys(groupedIssues).length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No issues found
          </div>
        )}
      </div>
    </div>
  );
}