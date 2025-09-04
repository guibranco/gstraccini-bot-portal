import {
  Play,
  GitBranch,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
} from "lucide-react";
import type { Workflow, WorkflowRun } from "../../types";

interface WorkflowsSectionProps {
  workflows: Workflow[];
  workflowRuns: WorkflowRun[];
}

function getStatusIcon(status: string, conclusion: string | null) {
  if (status === "in_progress") {
    return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
  }

  switch (conclusion) {
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "failure":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "cancelled":
      return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    case "skipped":
      return <AlertTriangle className="w-5 h-5 text-purple-500" />;
    default:
      return <Clock className="w-5 h-5 text-yellow-500" />;
  }
}

function getStatusClass(status: string, conclusion: string | null) {
  if (status === "in_progress") {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  }

  switch (conclusion) {
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "failure":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "cancelled":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    case "skipped":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    default:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  }
}

export function WorkflowsSection({
  workflows = [],
  workflowRuns = [],
}: WorkflowsSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:col-span-2">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
          <Play className="w-5 h-5 mr-2" />
          Workflows
        </h2>

        {/* Workflows Configuration */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {workflow.name}
                  </h4>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      workflow.state === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {workflow.state}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {workflow.path}
                </p>
                <div className="flex flex-wrap gap-2">
                  {workflow.on_pull_request && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      pull_request
                    </span>
                  )}
                  {workflow.on_push && (
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                      push
                    </span>
                  )}
                  {workflow.on_schedule && (
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                      schedule: {workflow.schedule_cron}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Runs */}
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Recent Runs
          </h3>
          <div className="space-y-4">
            {workflowRuns.map((run) => (
              <div
                key={run.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(run.status, run.conclusion)}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {run.workflow_name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <GitBranch className="w-4 h-4" />
                        <span>{run.head_branch}</span>
                        <span className="font-mono">
                          {run.head_sha.substring(0, 7)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(run.status, run.conclusion)}`}
                      >
                        {run.conclusion || run.status}
                      </span>
                      <div className="mt-1 flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        <img
                          src={run.actor.avatar_url}
                          alt={run.actor.login}
                          className="w-4 h-4 rounded-full"
                        />
                        <span>{run.actor.login}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jobs */}
                <div className="space-y-2">
                  {run.jobs.map((job) => (
                    <div
                      key={job.id}
                      className="pl-8 border-l-2 border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status, job.conclusion)}
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {job.name}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {job.completed_at
                            ? `Completed in ${Math.round((new Date(job.completed_at).getTime() - new Date(job.started_at).getTime()) / 1000)}s`
                            : "Running..."}
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="mt-2 space-y-1">
                        {job.steps.map((step) => (
                          <div
                            key={step.number}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <div className="w-4">
                              {getStatusIcon(step.status, step.conclusion)}
                            </div>
                            <span className="text-gray-600 dark:text-gray-300">
                              {step.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
