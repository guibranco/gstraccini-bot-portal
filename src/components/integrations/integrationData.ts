export const providerCommands: Record<
  string,
  Array<{ command: string; description: string }>
> = {
  SonarCloud: [
    { command: "/sonar analyze", description: "Trigger a new analysis" },
    {
      command: "/sonar quality-gate",
      description: "Check quality gate status",
    },
    { command: "/sonar coverage", description: "Show code coverage report" },
  ],
  Codacy: [
    { command: "/codacy analyze", description: "Run code analysis" },
    { command: "/codacy issues", description: "List code issues" },
    { command: "/codacy metrics", description: "Show code metrics" },
  ],
  Codecov: [
    { command: "/codecov status", description: "Check coverage status" },
    { command: "/codecov patch", description: "Show patch coverage" },
    { command: "/codecov report", description: "Generate coverage report" },
  ],
  Snyk: [
    { command: "/snyk test", description: "Run security scan" },
    { command: "/snyk monitor", description: "Enable continuous monitoring" },
    { command: "/snyk fix", description: "Apply security fixes" },
  ],
  OpenAI: [
    { command: "/ai review", description: "Request AI code review" },
    { command: "/ai suggest", description: "Get code suggestions" },
    { command: "/ai explain", description: "Explain code changes" },
  ],
};

export const providerActions: Record<
  string,
  Array<{ name: string; description: string; event: string }>
> = {
  SonarCloud: [
    {
      name: "Quality Gate Check",
      description: "Checks if code meets quality standards",
      event: "pull_request",
    },
    {
      name: "Code Analysis",
      description: "Analyzes code for issues and metrics",
      event: "push",
    },
    {
      name: "Security Review",
      description: "Scans for security vulnerabilities",
      event: "pull_request, push",
    },
  ],
  Codacy: [
    {
      name: "Code Quality Check",
      description: "Analyzes code quality and patterns",
      event: "pull_request",
    },
    {
      name: "Style Check",
      description: "Verifies code style compliance",
      event: "push",
    },
    {
      name: "Complexity Analysis",
      description: "Measures code complexity",
      event: "pull_request",
    },
  ],
  Codecov: [
    {
      name: "Coverage Report",
      description: "Generates code coverage report",
      event: "pull_request",
    },
    {
      name: "Coverage Diff",
      description: "Shows coverage changes",
      event: "pull_request",
    },
    {
      name: "Coverage Check",
      description: "Verifies coverage thresholds",
      event: "push",
    },
  ],
  Snyk: [
    {
      name: "Security Scan",
      description: "Scans for vulnerabilities",
      event: "pull_request, push",
    },
    {
      name: "Dependency Check",
      description: "Analyzes dependencies for issues",
      event: "push",
    },
    {
      name: "License Check",
      description: "Verifies license compliance",
      event: "pull_request",
    },
  ],
  OpenAI: [
    {
      name: "Code Review",
      description: "Performs AI-powered code review",
      event: "pull_request",
    },
    {
      name: "Description Enhancement",
      description: "Improves PR descriptions",
      event: "pull_request",
    },
    {
      name: "Code Suggestions",
      description: "Suggests code improvements",
      event: "pull_request",
    },
  ],
};
