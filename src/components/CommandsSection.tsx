import React from 'react';
import { Terminal, ExternalLink } from 'lucide-react';

const commands = [
  {
    command: "@gstraccini help",
    description: "Shows the help message with available commands.",
    docs: "https://docs.gstraccini.com/commands/help",
    places: "All"
  },
  {
    command: "@gstraccini add project <projectPath>",
    description: "Adds a project to the solution file (only for .NET projects).",
    docs: "https://docs.gstraccini.com/commands/add-project",
    places: "Portal"
  },
  {
    command: "@gstraccini appveyor build <type>",
    description: "Runs the AppVeyor build for the target commit and/or pull request.",
    docs: "https://docs.gstraccini.com/commands/appveyor-build",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini appveyor bump version <component>",
    description: "Bumps the CI version in AppVeyor.",
    docs: "https://docs.gstraccini.com/commands/appveyor-bump-version",
    places: "Issues + Pull Requests"
  },
  {
    command: "@gstraccini appveyor register",
    description: "Registers the repository in AppVeyor.",
    docs: "https://docs.gstraccini.com/commands/appveyor-register",
    places: "Portal"
  },
  {
    command: "@gstraccini appveyor reset",
    description: "Resets the AppVeyor build number for the target repository.",
    docs: "https://docs.gstraccini.com/commands/appveyor-reset",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini bump version <version> <project>",
    description: "Bumps the .NET version in .csproj files.",
    docs: "https://docs.gstraccini.com/commands/bump-version",
    places: "Portal"
  },
  {
    command: "@gstraccini cargo clippy",
    description: "Formats the Rust code using Cargo Clippy (only for Rust projects).",
    docs: "https://docs.gstraccini.com/commands/cargo-clippy",
    places: "All"
  },
  {
    command: "@gstraccini change runner <runner> <workflow> <jobs>",
    description: "Changes the GitHub action runner in a workflow file (.yml).",
    docs: "https://docs.gstraccini.com/commands/change-runner",
    places: "Issues + Pull Requests"
  },
  {
    command: "@gstraccini codacy bypass",
    description: "Bypasses the Codacy analysis for the target commit and/or pull request.",
    docs: "https://docs.gstraccini.com/commands/codacy-bypass",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini codacy reanalyze commit",
    description: "Reanalyzes the Codacy last commit in a pull request.",
    docs: "https://docs.gstraccini.com/commands/codacy-reanalyze-commit",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini codeclimate bypass",
    description: "Bypasses the CodeClimate analysis for the target commit and/or pull request.",
    docs: "https://docs.gstraccini.com/commands/codeclimate-bypass",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini copy labels <repository>",
    description: "Copies the labels from another repository.",
    docs: "https://docs.gstraccini.com/commands/copy-labels",
    places: "Issues"
  },
  {
    command: "@gstraccini copy issue <repository>",
    description: "Copies an issue from one repository to another.",
    docs: "https://docs.gstraccini.com/commands/copy-issue",
    places: "Issues"
  },
  {
    command: "@gstraccini create labels <style> <categories>",
    description: "Creates the default labels in the repository.",
    docs: "https://docs.gstraccini.com/commands/create-labels",
    places: "Issues"
  },
  {
    command: "@gstraccini csharpier",
    description: "Formats the C# code using CSharpier (only for .NET projects).",
    docs: "https://docs.gstraccini.com/commands/csharpier",
    places: "All"
  },
  {
    command: "@gstraccini fix csproj",
    description: "Updates the .csproj file with the packages.config version of NuGet packages (only for .NET Framework projects).",
    docs: "https://docs.gstraccini.com/commands/fix-csproj",
    places: "Portal"
  },
  {
    command: "@gstraccini npm check updates",
    description: "Updates dependencies in a package.json and package-lock.json.",
    docs: "https://docs.gstraccini.com/commands/npm-check-updates",
    places: "Portal"
  },
  {
    command: "@gstraccini npm dist",
    description: "Generates or regenerates the dist files.",
    docs: "https://docs.gstraccini.com/commands/npm-dist",
    places: "Portal"
  },
  {
    command: "@gstraccini prettier",
    description: "Formats the code using Prettier.",
    docs: "https://docs.gstraccini.com/commands/prettier",
    places: "All"
  },
  {
    command: "@gstraccini rerun checks <conclusion>",
    description: "Reruns the checks in the target pull request.",
    docs: "https://docs.gstraccini.com/commands/rerun-checks",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini rerun workflows <conclusion>",
    description: "Reruns the workflows (actions) in the target pull request.",
    docs: "https://docs.gstraccini.com/commands/rerun-workflows",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini review",
    description: "Enables review for the target pull request.",
    docs: "https://docs.gstraccini.com/commands/review",
    places: "Pull Requests"
  },
  {
    command: "@gstraccini update snapshot",
    description: "Updates test snapshots (npm test -- -u) (only for Node.js projects).",
    docs: "https://docs.gstraccini.com/commands/update-snapshot",
    places: "Portal"
  }
];

export default function CommandsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Available Commands
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Powerful commands to automate your workflow
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commands.map((command, index) => (
            <div 
              key={index} 
              className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <Terminal className="h-6 w-6 text-blue-600 mb-4" />
              <code className="text-sm font-mono text-blue-600 mb-3 block">
                {command.command}
              </code>
              <p className="text-gray-600 text-sm mb-4">{command.description}</p>
              <div className="flex items-center justify-between">
                <a 
                  href={command.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                >
                  📖 Documentation
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {command.places}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}