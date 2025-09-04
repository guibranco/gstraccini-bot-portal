import { User } from "./types";

export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  github_id?: string;
  github_email?: string;
  communications_email?: string;
  has_2fa?: boolean;
  has_password?: boolean;
  recovery_codes?: string[];
  fido_devices?: FIDODevice[];
}

export interface Event {
  delivery_id: string;
  type: string;
  action?: string;
  date: string;
  payload: {
    [key: string]: any;
    sender?: {
      login: string;
      avatar_url: string;
    };
  };
}

export interface FIDODevice {
  id: string;
  name: string;
  added_at: string;
  last_used_at: string;
}

export interface Installation {
  id: string;
  account: {
    login: string;
    name?: string;
    avatar_url: string;
    type: "User" | "Organization";
  };
  repositories_count: number;
  created_at: string;
  updated_at: string;
  suspended?: boolean;
}

export interface AvailableOrganization {
  login: string;
  name?: string;
  avatar_url: string;
  description?: string;
  members_count: number;
  repositories_count: number;
}

export interface PullRequest {
  url: string;
  title: string;
  repository: string;
  full_name: string;
  created_at: string;
  state: "success" | "failure" | "pending" | "error" | "skipped" | "empty";
  owner?: string;
  labels?: Label[];
  sender: User;
}

export interface Label {
  name: string;
  color: string;
  description?: string;
}

export interface Issue {
  url: string;
  title: string;
  repository: string;
  full_name: string;
  created_at: string;
  owner?: string;
  labels?: Label[];
  sender: User;
}

export interface Activity {
  id: string;
  type:
    | "pr_created"
    | "pr_merged"
    | "issue_closed"
    | "commits_analyzed"
    | "pr_opened";
  description: string;
  repository: string;
  timestamp: string;
  sender: User;
}

export interface PendingAction {
  id: string;
  type:
    | "review_pr"
    | "close_issue"
    | "merge_pr"
    | "update_readme"
    | "respond_issue";
  description: string;
  repository: string;
  priority: "high" | "medium" | "low";
}

export interface Repository {
  organization: string;
  organization_avatar?: string;
  name: string;
  url: string;
  stars: number;
  fork: boolean;
  forks: number;
  issues: number;
  language: string;
  visibility: "public" | "private";
  branches: Branch[];
  default_branch: string;
  latest_release?: Release;
  pages?: Pages;
  branch_protection: BranchProtection[];
  rulesets: Ruleset[];
  integrations: Integration[];
  workflows: Workflow[];
  workflow_runs: WorkflowRun[];
}

export interface Branch {
  name: string;
  protected: boolean;
  last_commit: string;
}

export interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  prerelease: boolean;
  draft: boolean;
}

export interface Pages {
  url: string;
  status: string;
  environment: string;
  protected: boolean;
  cname?: string;
  https_enforced: boolean;
  custom_404: boolean;
}

export interface BranchProtection {
  branch: string;
  required_status_checks: boolean;
  enforce_admins: boolean;
  required_pull_request_reviews: boolean;
  dismiss_stale_reviews: boolean;
  require_code_owner_reviews: boolean;
}

export interface Ruleset {
  name: string;
  target: string[];
  enforcement: "active" | "evaluate" | "disabled";
  bypass_actors: string[];
  conditions: {
    ref_name: {
      include: string[];
      exclude: string[];
    };
  };
  rules: {
    creation: boolean;
    update: boolean;
    deletion: boolean;
    required_signatures: boolean;
    required_status_checks: string[];
    required_deployments: string[];
  };
}

export interface Workflow {
  id: string;
  name: string;
  path: string;
  state: "active" | "disabled";
  created_at: string;
  updated_at: string;
  triggers: string[];
  on_pull_request: boolean;
  on_push: boolean;
  on_schedule: boolean;
  schedule_cron?: string;
  jobs: WorkflowJob[];
}

export interface WorkflowJob {
  id: string;
  name: string;
  runs_on: string[];
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  name: string;
  uses?: string;
  run?: string;
  with?: Record<string, string>;
}

export interface WorkflowRun {
  id: string;
  workflow_name: string;
  status: "queued" | "in_progress" | "completed";
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null;
  created_at: string;
  updated_at: string;
  head_branch: string;
  head_sha: string;
  trigger: string;
  jobs: WorkflowRunJob[];
  actor: {
    login: string;
    avatar_url: string;
  };
}

export interface WorkflowRunJob {
  id: string;
  name: string;
  status: "queued" | "in_progress" | "completed";
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null;
  started_at: string;
  completed_at?: string;
  steps: WorkflowRunStep[];
}

export interface WorkflowRunStep {
  name: string;
  status: "queued" | "in_progress" | "completed";
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null;
  number: number;
  started_at: string;
  completed_at?: string;
}

export interface Notification {
  id: string;
  type:
    | "pr_review"
    | "pr_merged"
    | "issue_mention"
    | "issue_assigned"
    | "pr_changes"
    | "security_alert";
  title: string;
  description: string;
  repository: string;
  full_name: string;
  created_at: string;
  read: boolean;
  url: string;
  sender: User;
  priority?: "high" | "medium" | "low";
}

export interface IntegrationUsage {
  id: string;
  timestamp: string;
  endpoint: string;
  status: number;
  duration: number;
}

export interface Integration {
  provider: string;
  apiKey: string;
  status: "Active" | "Inactive" | "Error" | "Validating";
  lastUsage: string;
  lastError: string;
  last_check: string;
  url?: string;
  metrics?: {
    [key: string]: string | number | { [key: string]: string };
  };
}

export interface Provider {
  name: string;
  logo: string;
  description: string;
}

export type DependabotFrequency = "daily" | "weekly" | "monthly";

export interface RepositorySettings {
  createLabels: boolean;
  createMainBranchRuleset: boolean;
  rulesetBotChecks: boolean;
  rulesetUpdatedBranch: boolean;
  rulesetRequiredReviewers: boolean;
  rulesetResolveConversations: boolean;
  createDependabotFile: boolean;
  dependabotFrequency: DependabotFrequency;
  createSecretsWorkflow: boolean;
  createLintersWorkflow: boolean;
}
