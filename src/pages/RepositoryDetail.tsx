import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { RepositoryHeader } from "../components/repository/RepositoryHeader";
import { BranchesSection } from "../components/repository/BranchesSection";
import { LatestReleaseSection } from "../components/repository/LatestReleaseSection";
import { PagesSection } from "../components/repository/PagesSection";
import { BranchProtectionSection } from "../components/repository/BranchProtectionSection";
import { RulesetsSection } from "../components/repository/RulesetsSection";
import { IntegrationsSection } from "../components/repository/IntegrationsSection";
import { WorkflowsSection } from "../components/repository/WorkflowsSection";
import type { Repository } from "../types";

const mockRepository: Repository = {
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
  branches: [
    {
      name: "main",
      protected: true,
      last_commit: "2024-03-15T10:30:00Z",
    },
    {
      name: "development",
      protected: true,
      last_commit: "2024-03-14T15:45:00Z",
    },
    {
      name: "feature/concurrent-mode",
      protected: false,
      last_commit: "2024-03-13T09:20:00Z",
    },
  ],
  default_branch: "main",
  latest_release: {
    tag_name: "v18.3.0",
    name: "React v18.3.0",
    published_at: "2024-03-10T12:00:00Z",
    body: "This release includes several new features and improvements:\n\n- Enhanced concurrent rendering\n- Improved server components\n- Bug fixes and performance optimizations",
    prerelease: false,
    draft: false,
  },
  pages: {
    url: "https://reactjs.org",
    status: "active",
    environment: "production",
    protected: true,
    cname: "reactjs.org",
    https_enforced: true,
    custom_404: true,
  },
  branch_protection: [
    {
      branch: "main",
      required_status_checks: true,
      enforce_admins: true,
      required_pull_request_reviews: true,
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true,
    },
    {
      branch: "development",
      required_status_checks: true,
      enforce_admins: false,
      required_pull_request_reviews: true,
      dismiss_stale_reviews: true,
      require_code_owner_reviews: false,
    },
  ],
  rulesets: [
    {
      name: "Main Branch Protection",
      target: ["branch:main"],
      enforcement: "active",
      bypass_actors: ["maintainers", "security-managers"],
      conditions: {
        ref_name: {
          include: ["refs/heads/main"],
          exclude: [],
        },
      },
      rules: {
        creation: false,
        update: true,
        deletion: false,
        required_signatures: true,
        required_status_checks: ["ci/build", "security/scan"],
        required_deployments: ["production"],
      },
    },
    {
      name: "Development Branch Rules",
      target: ["branch:development"],
      enforcement: "active",
      bypass_actors: ["maintainers"],
      conditions: {
        ref_name: {
          include: ["refs/heads/development"],
          exclude: [],
        },
      },
      rules: {
        creation: true,
        update: true,
        deletion: false,
        required_signatures: false,
        required_status_checks: ["ci/build"],
        required_deployments: ["staging"],
      },
    },
  ],
  integrations: [
    {
      provider: "SonarCloud",
      apiKey: "sonar_12345678901234567890",
      status: "Active",
      lastUsage: new Date().toISOString(),
      lastError: "N/A",
      last_check: new Date().toISOString(),
      url: "https://sonarcloud.io/project/overview?id=facebook_react",
      metrics: {
        coverage: "87.5%",
        bugs: "12",
        code_smells: "156",
        duplications: "2.3%",
        maintainability: "A",
        reliability: "A",
        security: "A+",
      },
    },
    {
      provider: "Codecov",
      apiKey: "codecov_12345678901234567890",
      status: "Active",
      lastUsage: new Date().toISOString(),
      lastError: "N/A",
      last_check: new Date().toISOString(),
      url: "https://codecov.io/gh/facebook/react",
      metrics: {
        coverage: "92.1%",
        files: "1,245",
        lines: "158,932",
        hits: "146,376",
        misses: "12,556",
        patches: "98.4%",
        changes: "95.7%",
      },
    },
    {
      provider: "Codacy",
      apiKey: "codacy_12345678901234567890",
      status: "Active",
      lastUsage: new Date().toISOString(),
      lastError: "N/A",
      last_check: new Date().toISOString(),
      url: "https://app.codacy.com/gh/facebook/react",
      metrics: {
        grade: "A",
        issues: "89",
        complexity: "Low",
        duplication: "3.2%",
        coverage: "88.9%",
        security_issues: "0",
        technical_debt: "2.5d",
      },
    },
    {
      provider: "Snyk",
      apiKey: "snyk_12345678901234567890",
      status: "Active",
      lastUsage: "2024-03-15T08:15:00Z",
      lastError: "N/A",
      last_check: "2024-03-15T08:15:00Z",
      url: "https://app.snyk.io/org/facebook/project/react",
      metrics: {
        vulnerabilities: {
          high: "0",
          medium: "3",
          low: "7",
        },
        dependencies: "1,234",
        fixable: "8",
        license_issues: "0",
      },
    },
  ],
  workflows: [
    {
      id: "1",
      name: "CI",
      path: ".github/workflows/ci.yml",
      state: "active",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-03-15T10:30:00Z",
      triggers: ["push", "pull_request"],
      on_pull_request: true,
      on_push: true,
      on_schedule: false,
      jobs: [
        {
          id: "build",
          name: "Build and Test",
          runs_on: ["ubuntu-latest"],
          steps: [
            { name: "Checkout", uses: "actions/checkout@v4" },
            { name: "Setup Node.js", uses: "actions/setup-node@v4" },
            { name: "Install Dependencies", run: "npm ci" },
            { name: "Run Tests", run: "npm test" },
            { name: "Build", run: "npm run build" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Release",
      path: ".github/workflows/release.yml",
      state: "active",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-03-15T10:30:00Z",
      triggers: ["workflow_dispatch", "schedule"],
      on_pull_request: false,
      on_push: false,
      on_schedule: true,
      schedule_cron: "0 0 * * 1",
      jobs: [
        {
          id: "release",
          name: "Create Release",
          runs_on: ["ubuntu-latest"],
          steps: [
            { name: "Checkout", uses: "actions/checkout@v4" },
            { name: "Setup Node.js", uses: "actions/setup-node@v4" },
            { name: "Create Release", uses: "actions/create-release@v1" },
          ],
        },
      ],
    },
  ],
  workflow_runs: [
    {
      id: "1",
      workflow_name: "CI",
      status: "completed",
      conclusion: "success",
      created_at: "2024-03-15T10:30:00Z",
      updated_at: "2024-03-15T10:35:00Z",
      head_branch: "main",
      head_sha: "abc123def456",
      trigger: "push",
      actor: {
        login: "johndoe",
        avatar_url: "https://github.com/johndoe.png",
      },
      jobs: [
        {
          id: "build1",
          name: "Build and Test",
          status: "completed",
          conclusion: "success",
          started_at: "2024-03-15T10:30:00Z",
          completed_at: "2024-03-15T10:35:00Z",
          steps: [
            {
              name: "Set up Node.js",
              status: "completed",
              conclusion: "success",
              number: 1,
              started_at: "2024-03-15T10:30:00Z",
              completed_at: "2024-03-15T10:31:00Z",
            },
            {
              name: "Install dependencies",
              status: "completed",
              conclusion: "success",
              number: 2,
              started_at: "2024-03-15T10:31:00Z",
              completed_at: "2024-03-15T10:33:00Z",
            },
            {
              name: "Run tests",
              status: "completed",
              conclusion: "success",
              number: 3,
              started_at: "2024-03-15T10:33:00Z",
              completed_at: "2024-03-15T10:35:00Z",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      workflow_name: "CI",
      status: "in_progress",
      conclusion: null,
      created_at: "2024-03-15T11:00:00Z",
      updated_at: "2024-03-15T11:02:00Z",
      head_branch: "feature/new-component",
      head_sha: "def456ghi789",
      trigger: "pull_request",
      actor: {
        login: "janedoe",
        avatar_url: "https://github.com/janedoe.png",
      },
      jobs: [
        {
          id: "build2",
          name: "Build and Test",
          status: "in_progress",
          conclusion: null,
          started_at: "2024-03-15T11:00:00Z",
          steps: [
            {
              name: "Set up Node.js",
              status: "completed",
              conclusion: "success",
              number: 1,
              started_at: "2024-03-15T11:00:00Z",
              completed_at: "2024-03-15T11:01:00Z",
            },
            {
              name: "Install dependencies",
              status: "in_progress",
              conclusion: null,
              number: 2,
              started_at: "2024-03-15T11:01:00Z",
            },
          ],
        },
      ],
    },
  ],
};

export function RepositoryDetail() {
  const { org, repo } = useParams<{ org: string; repo: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRepository(mockRepository);
      } catch (error) {
        console.error("Error fetching repository:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepository();
  }, [org, repo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Repository not found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The repository you're looking for doesn't exist or you don't have
            access to it.
          </p>
          <Link
            to="/repositories"
            className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Repositories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/repositories"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Repositories
      </Link>

      <RepositoryHeader repository={repository} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BranchesSection
          branches={repository.branches}
          defaultBranch={repository.default_branch}
        />

        <LatestReleaseSection release={repository.latest_release} />

        {repository.pages && <PagesSection pages={repository.pages} />}

        <BranchProtectionSection
          protectionRules={repository.branch_protection}
        />

        <RulesetsSection rulesets={repository.rulesets} />

        <WorkflowsSection
          workflows={repository.workflows}
          workflowRuns={repository.workflow_runs}
        />

        <IntegrationsSection integrations={repository.integrations} />
      </div>
    </div>
  );
}
