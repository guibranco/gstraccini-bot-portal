import {
  Activity,
  Issue,
  PendingAction,
  PullRequest,
  Repository,
  User,
  Notification,
  Installation,
  FIDODevice,
  AvailableOrganization,
  Provider,
} from "./types";

export const mockUser: User = {
  login: "johndoe",
  name: "John Doe",
  first_name: "John",
  last_name: "Doe",
  avatar_url:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
  html_url: "https://github.com/johndoe",
  github_id: "12345678",
  github_email: "john.doe@github.com",
  communications_email: "john.doe@example.com",
  has_2fa: true,
  has_password: true,
  recovery_codes: [
    "abcd-efgh-ijkl-mnop",
    "qrst-uvwx-yzab-cdef",
    "ghij-klmn-opqr-stuv",
    "wxyz-abcd-efgh-ijkl",
    "mnop-qrst-uvwx-yzab",
    "cdef-ghij-klmn-opqr",
    "stuv-wxyz-abcd-efgh",
    "ijkl-mnop-qrst-uvwx",
    "yzab-cdef-ghij-klmn",
    "opqr-stuv-wxyz-abcd",
  ],
  fido_devices: [
    {
      id: "1",
      name: "YubiKey 5C",
      added_at: "2024-01-15T10:30:00Z",
      last_used_at: "2024-03-10T15:45:00Z",
    },
    {
      id: "2",
      name: "Security Key by Yubico",
      added_at: "2023-11-20T09:15:00Z",
      last_used_at: "2024-03-09T11:20:00Z",
    },
  ],
};

export const mockInstallations: Installation[] = [
  {
    id: "1",
    account: {
      login: "facebook",
      name: "Meta",
      avatar_url: "https://github.com/facebook.png",
      type: "Organization",
    },
    repositories_count: 45,
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2024-03-10T15:45:00Z",
  },
  {
    id: "2",
    account: {
      login: "vercel",
      name: "Vercel",
      avatar_url: "https://github.com/vercel.png",
      type: "Organization",
    },
    repositories_count: 12,
    created_at: "2023-06-20T09:15:00Z",
    updated_at: "2024-03-09T11:20:00Z",
  },
  {
    id: "3",
    account: {
      login: "johndoe",
      name: "John Doe",
      avatar_url:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
      type: "User",
    },
    repositories_count: 8,
    created_at: "2023-08-10T14:25:00Z",
    updated_at: "2024-03-08T16:30:00Z",
  },
];

export const mockAvailableOrganizations: AvailableOrganization[] = [
  {
    login: "microsoft",
    name: "Microsoft",
    avatar_url: "https://github.com/microsoft.png",
    description: "Open source projects and samples from Microsoft",
    members_count: 5420,
    repositories_count: 876,
  },
  {
    login: "google",
    name: "Google",
    avatar_url: "https://github.com/google.png",
    description: "Google ❤️ Open Source",
    members_count: 3250,
    repositories_count: 654,
  },
  {
    login: "aws",
    name: "Amazon Web Services",
    avatar_url: "https://github.com/aws.png",
    description: "Official AWS open-source repositories",
    members_count: 2180,
    repositories_count: 432,
  },
];

const mockSenders = [
  {
    login: "alice",
    name: "Alice Johnson",
    avatar_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    html_url: "https://github.com/alice",
  },
  {
    login: "bob",
    name: "Bob Smith",
    avatar_url:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    html_url: "https://github.com/bob",
  },
  {
    login: "carol",
    name: "Carol Williams",
    avatar_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    html_url: "https://github.com/carol",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "pr_review",
    title: "Review requested: Add authentication system",
    description: "Your review has been requested on pull request #45",
    repository: "repo1",
    full_name: "org/repo1",
    created_at: "2024-03-10T10:30:00Z",
    read: false,
    url: "https://github.com/org/repo1/pull/45",
    sender: mockSenders[0],
    priority: "high",
  },
  {
    id: "2",
    type: "issue_mention",
    title: "Mentioned in: Update API documentation",
    description: "@johndoe please review the API changes",
    repository: "repo2",
    full_name: "org/repo2",
    created_at: "2024-03-09T15:20:00Z",
    read: false,
    url: "https://github.com/org/repo2/issues/12",
    sender: mockSenders[1],
  },
  {
    id: "3",
    type: "pr_merged",
    title: "Pull request merged: Fix memory leak",
    description: "Pull request #44 has been merged",
    repository: "repo2",
    full_name: "org/repo2",
    created_at: "2024-03-08T09:15:00Z",
    read: true,
    url: "https://github.com/org/repo2/pull/44",
    sender: mockSenders[2],
  },
  {
    id: "4",
    type: "security_alert",
    title: "Security vulnerability found",
    description: "Critical vulnerability detected in dependency: lodash",
    repository: "repo1",
    full_name: "org/repo1",
    created_at: "2024-03-07T14:45:00Z",
    read: false,
    url: "https://github.com/org/repo1/security/alerts/1",
    sender: mockSenders[0],
    priority: "high",
  },
  {
    id: "5",
    type: "issue_assigned",
    title: "Assigned to issue: Update documentation",
    description: "You have been assigned to issue #15",
    repository: "repo3",
    full_name: "org/repo3",
    created_at: "2024-03-06T11:30:00Z",
    read: true,
    url: "https://github.com/org/repo3/issues/15",
    sender: mockSenders[1],
  },
];

export const mockPullRequests: PullRequest[] = [
  {
    url: "https://github.com/org/repo1/pull/45",
    title: "Feature: Add new authentication system",
    repository: "repo1",
    full_name: "org/repo1",
    created_at: "2024-03-10T10:30:00Z",
    state: "success",
    sender: mockSenders[0],
  },
  {
    url: "https://github.com/org/repo2/pull/44",
    title: "Fix: Resolve memory leak in worker process",
    repository: "repo2",
    full_name: "org/repo2",
    created_at: "2024-03-09T15:20:00Z",
    state: "pending",
    sender: mockSenders[1],
  },
  {
    url: "https://github.com/org2/repo3/pull/43",
    title: "Docs: Update API documentation",
    repository: "repo3",
    full_name: "org2/repo3",
    created_at: "2024-03-08T09:15:00Z",
    state: "failure",
    sender: mockSenders[2],
  },
];

export const mockIssues: Issue[] = [
  {
    url: "https://github.com/org/repo1/issues/10",
    title: "Bug: Server crashes under heavy load",
    repository: "repo1",
    full_name: "org/repo1",
    created_at: "2024-03-10T08:45:00Z",
    sender: mockSenders[0],
  },
  {
    url: "https://github.com/org/repo2/issues/11",
    title: "Enhancement: Add dark mode support",
    repository: "repo2",
    full_name: "org/repo2",
    created_at: "2024-03-09T14:30:00Z",
    sender: mockSenders[1],
  },
  {
    url: "https://github.com/org/repo3/issues/12",
    title: "Feature Request: Email notifications",
    repository: "repo3",
    full_name: "org/repo3",
    created_at: "2024-03-08T11:20:00Z",
    sender: mockSenders[2],
  },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "pr_created",
    description: "Created PR #45 in repo1",
    repository: "repo1",
    timestamp: "2024-03-10T10:30:00Z",
    sender: mockSenders[0],
  },
  {
    id: "2",
    type: "pr_merged",
    description: "Merged PR #44 in repo2",
    repository: "repo2",
    timestamp: "2024-03-09T15:20:00Z",
    sender: mockSenders[1],
  },
  {
    id: "3",
    type: "issue_closed",
    description: "Closed issue #10 in repo1",
    repository: "repo1",
    timestamp: "2024-03-08T09:15:00Z",
    sender: mockSenders[2],
  },
  {
    id: "4",
    type: "commits_analyzed",
    description: "Analyzed commits in repo3",
    repository: "repo3",
    timestamp: "2024-03-07T14:45:00Z",
    sender: mockSenders[0],
  },
  {
    id: "5",
    type: "pr_opened",
    description: "Opened PR #12 in repo2",
    repository: "repo2",
    timestamp: "2024-03-06T11:30:00Z",
    sender: mockSenders[1],
  },
];

export const mockPendingActions: PendingAction[] = [
  {
    id: "1",
    type: "review_pr",
    description: "Review PR #43 in repo3",
    repository: "repo3",
    priority: "high",
  },
  {
    id: "2",
    type: "close_issue",
    description: "Close issue #11 in repo2",
    repository: "repo2",
    priority: "medium",
  },
  {
    id: "3",
    type: "merge_pr",
    description: "Merge PR #42 in repo1",
    repository: "repo1",
    priority: "high",
  },
  {
    id: "4",
    type: "update_readme",
    description: "Update README in repo2",
    repository: "repo2",
    priority: "low",
  },
  {
    id: "5",
    type: "respond_issue",
    description: "Respond to issue #9 in repo1",
    repository: "repo1",
    priority: "medium",
  },
];

export const mockRepositories: Repository[] = [
  {
    organization: "facebook",
    organization_avatar: "https://github.com/facebook.png",
    name: "react",
    url: "https://github.com/facebook/react",
    stars: 215000,
    fork: false,
    forks: 45000,
    issues: 1200,
    language: "JavaScript",
    visibility: "public",
  },
  {
    organization: "vercel",
    organization_avatar: "https://github.com/vercel.png",
    name: "next.js",
    url: "https://github.com/vercel/next.js",
    stars: 115000,
    fork: false,
    forks: 24000,
    issues: 1500,
    language: "TypeScript",
    visibility: "public",
  },
  {
    organization: "tailwindlabs",
    organization_avatar: "https://github.com/tailwindlabs.png",
    name: "tailwindcss",
    url: "https://github.com/tailwindlabs/tailwindcss",
    stars: 75000,
    fork: false,
    forks: 4200,
    issues: 450,
    language: "JavaScript",
    visibility: "public",
  },
  {
    organization: "microsoft",
    organization_avatar: "https://github.com/microsoft.png",
    name: "vscode",
    url: "https://github.com/microsoft/vscode",
    stars: 155000,
    fork: false,
    forks: 28000,
    issues: 7800,
    language: "TypeScript",
    visibility: "public",
  },
  {
    organization: "internal",
    organization_avatar: "https://github.com/internal.png",
    name: "api-service",
    url: "https://github.com/internal/api-service",
    stars: 12,
    fork: true,
    forks: 3,
    issues: 25,
    language: "Go",
    visibility: "private",
  },
];

export const mockProviders: Record<string, Provider> = {
  SonarCloud: {
    name: "SonarCloud",
    logo: "https://cdn.simpleicons.org/SonarQubeCloud",
    description: "Code Quality and Security Analysis",
  },
  AppVeyor: {
    name: "AppVeyor",
    logo: "https://cdn.simpleicons.org/appveyor",
    description: "Continuous Integration and Deployment",
  },
  Codacy: {
    name: "Codacy",
    logo: "https://cdn.simpleicons.org/codacy",
    description: "Automated Code Reviews and Analytics",
  },
  Codecov: {
    name: "Codecov",
    logo: "https://cdn.simpleicons.org/codecov",
    description: "Code Coverage Reports and Analysis",
  },
  DeepSource: {
    name: "DeepSource",
    logo: "https://bot.straccini.com/images/Deepsource.png",
    description: "Static Analysis and Code Quality",
  },
  CodeClimate: {
    name: "CodeClimate",
    logo: "https://cdn.simpleicons.org/codeclimate",
    description: "Code Quality and Technical Debt Monitoring",
  },
  Snyk: {
    name: "Snyk",
    logo: "https://cdn.simpleicons.org/snyk",
    description: "Security Vulnerability Scanner",
  },
  OpenAI: {
    name: "OpenAI",
    logo: "https://bot.straccini.com/images/OpenAI.png",
    description: "AI-Powered Code Analysis and Review",
  },
  Llama: {
    name: "Llama",
    logo: "https://bot.straccini.com/images/Llama.png",
    description: "AI Language Model Integration",
  },
  CPanel: {
    name: "cPanel",
    logo: "https://cdn.simpleicons.org/cpanel",
    description: "Web Hosting Control Panel Integration",
  },
  CloudAMQP: {
    name: "CloudAMQP",
    logo: "https://bot.straccini.com/images/CloudAMQP.png",
    description: "Managed RabbitMQ Message Broker",
  },
  Claude: {
    name: "Claude",
    logo: "https://cdn.simpleicons.org/Claude",
    description: "Anthropic AI-Powered Code Analysis and Review", 
  },
};

const mockUsageHistory: IntegrationUsage[] = [
  {
    id: "1",
    timestamp: "2024-03-15T10:30:00Z",
    endpoint: "/api/analyze",
    status: 200,
    duration: 1250,
  },
  {
    id: "2",
    timestamp: "2024-03-15T10:25:00Z",
    endpoint: "/api/quality-gate",
    status: 200,
    duration: 850,
  },
  {
    id: "3",
    timestamp: "2024-03-15T10:20:00Z",
    endpoint: "/api/coverage",
    status: 404,
    duration: 450,
  },
  {
    id: "4",
    timestamp: "2024-03-15T10:15:00Z",
    endpoint: "/api/analyze",
    status: 500,
    duration: 2100,
  },
];

export const mockIntegrations: Integration[] = [
  {
    provider: "SonarCloud",
    apiKey: "sonar_12345678901234567890",
    status: "Active",
    lastUsage: "2024-03-15T10:30:00Z",
    lastError: "N/A",
    usageHistory: mockUsageHistory,
  },
];
