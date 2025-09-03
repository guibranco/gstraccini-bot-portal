import { useState, useEffect } from "react";
import type { PullRequest } from "../types";
import { PullRequestFilters } from "../components/pullrequests/PullRequestFilters";
import { PullRequestGroup } from "../components/pullrequests/PullRequestGroup";

interface GroupedPullRequests {
  [owner: string]: PullRequest[];
}

const stateOrder = [
  "success",
  "failure",
  "pending",
  "error",
  "skipped",
  "",
] as const;

export function PullRequests() {
  const [isLoading, setIsLoading] = useState(true);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [groupedPullRequests, setGroupedPullRequests] =
    useState<GroupedPullRequests>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedSenders, setSelectedSenders] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [allLabels, setAllLabels] = useState<
    Array<{ name: string; color: string }>
  >([]);

  const stateOptions = stateOrder.map((state) => ({
    value: state,
    label: state.charAt(0).toUpperCase() + state.slice(1),
    color:
      state === "success"
        ? "22c55e"
        : state === "failure"
          ? "ef4444"
          : state === "pending"
            ? "eab308"
            : state === "error"
              ? "ef4444"
              : state === "skipped"
                ? "6b7280"
                : "6b7280",
  }));

  useEffect(() => {
    // Simulate API call
    const fetchPullRequests = async () => {
      try {
        // In a real app, this would be an API call
        const mockPullRequests: PullRequest[] = [
          {
            url: "https://github.com/org/repo1/pull/45",
            title: "Feature: Add new authentication system",
            repository: "repo1",
            full_name: "org/repo1",
            created_at: "2024-03-10T10:30:00Z",
            state: "success",
            owner: "Organization 1",
            labels: [
              { name: "feature", color: "0d6efd", description: "New feature" },
              {
                name: "security",
                color: "dc3545",
                description: "Security related",
              },
            ],
            sender: {
              login: "alice",
              name: "Alice Johnson",
              avatar_url:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              html_url: "https://github.com/alice",
            },
          },
          {
            url: "https://github.com/org/repo2/pull/44",
            title: "Fix: Resolve memory leak in worker process",
            repository: "repo2",
            full_name: "org/repo2",
            created_at: "2024-03-09T15:20:00Z",
            state: "pending",
            owner: "Organization 1",
            labels: [{ name: "bug", color: "dc3545", description: "Bug fix" }],
            sender: {
              login: "bob",
              name: "Bob Smith",
              avatar_url:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
              html_url: "https://github.com/bob",
            },
          },
          {
            url: "https://github.com/org2/repo3/pull/43",
            title: "Docs: Update API documentation",
            repository: "repo3",
            full_name: "org2/repo3",
            created_at: "2024-03-08T09:15:00Z",
            state: "failure",
            owner: "Organization 2",
            labels: [
              {
                name: "documentation",
                color: "6f42c1",
                description: "Documentation update",
              },
            ],
            sender: {
              login: "carol",
              name: "Carol Williams",
              avatar_url:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
              html_url: "https://github.com/carol",
            },
          },
        ];

        // Sort pull requests by state order
        mockPullRequests.sort((a, b) => {
          return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state);
        });

        setPullRequests(mockPullRequests);

        // Extract unique labels
        const uniqueLabels = Array.from(
          new Set(
            mockPullRequests
              .flatMap((pr) => pr.labels || [])
              .map((label) => JSON.stringify(label)),
          ),
        ).map((str) => JSON.parse(str));
        setAllLabels(uniqueLabels);

        // Filter pull requests
        const filteredPRs = mockPullRequests.filter((pr) => {
          if (
            selectedOwners.length > 0 &&
            !selectedOwners.includes(pr.owner || "Unknown")
          )
            return false;
          if (
            selectedSenders.length > 0 &&
            !selectedSenders.includes(pr.sender.login)
          )
            return false;
          if (selectedStates.length > 0 && !selectedStates.includes(pr.state))
            return false;
          if (selectedLabels.length > 0) {
            const prLabels = pr.labels?.map((l) => l.name) || [];
            if (!selectedLabels.some((label) => prLabels.includes(label)))
              return false;
          }
          return true;
        });

        // Group pull requests by owner
        const grouped = filteredPRs.reduce((acc, pr) => {
          const owner = pr.owner || "Unknown";
          if (!acc[owner]) {
            acc[owner] = [];
          }
          acc[owner].push(pr);
          return acc;
        }, {} as GroupedPullRequests);

        // Sort pull requests within each group by state
        Object.keys(grouped).forEach((owner) => {
          grouped[owner].sort((a, b) => {
            return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state);
          });
        });

        setGroupedPullRequests(grouped);
        setExpandedGroups(new Set(Object.keys(grouped)));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pull requests:", error);
        setIsLoading(false);
      }
    };

    fetchPullRequests();
  }, [selectedOwners, selectedSenders, selectedStates, selectedLabels]);

  const toggleGroup = (owner: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(owner)) {
        next.delete(owner);
      } else {
        next.add(owner);
      }
      return next;
    });
  };

  const ownerOptions = Array.from(
    new Set(pullRequests.map((pr) => pr.owner || "Unknown")),
  ).map((owner) => ({
    value: owner,
    label: owner,
  }));

  const senderOptions = Array.from(
    new Set(pullRequests.map((pr) => pr.sender)).values(),
  ).map((sender) => ({
    value: sender.login,
    label: sender.name || sender.login,
    avatar: sender.avatar_url,
    description: `@${sender.login}`,
  }));

  const clearFilters = () => {
    setSelectedOwners([]);
    setSelectedSenders([]);
    setSelectedStates([]);
    setSelectedLabels([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PullRequestFilters
        ownerOptions={ownerOptions}
        senderOptions={senderOptions}
        stateOptions={stateOptions}
        labelOptions={allLabels.map((label) => ({
          value: label.name,
          label: label.name,
          color: label.color,
        }))}
        selectedOwners={selectedOwners}
        selectedSenders={selectedSenders}
        selectedStates={selectedStates}
        selectedLabels={selectedLabels}
        isFiltersExpanded={isFiltersExpanded}
        onOwnersChange={setSelectedOwners}
        onSendersChange={setSelectedSenders}
        onStatesChange={setSelectedStates}
        onLabelsChange={setSelectedLabels}
        onToggleExpanded={() => setIsFiltersExpanded(!isFiltersExpanded)}
        onClearFilters={clearFilters}
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Assigned Pull Requests
          </h1>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-full text-sm font-medium">
            {Object.values(groupedPullRequests).reduce(
              (acc, curr) => acc + curr.length,
              0,
            )}
          </span>
        </div>

        {Object.entries(groupedPullRequests).map(
          ([owner, ownerPullRequests]) => (
            <PullRequestGroup
              key={owner}
              owner={owner}
              pullRequests={ownerPullRequests}
              isExpanded={expandedGroups.has(owner)}
              onToggle={() => toggleGroup(owner)}
            />
          ),
        )}

        {Object.keys(groupedPullRequests).length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No pull requests found
          </div>
        )}
      </div>
    </div>
  );
}
