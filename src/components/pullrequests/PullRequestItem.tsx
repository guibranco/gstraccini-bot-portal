import {
  GitPullRequest,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { PullRequest } from "../../types";

interface PullRequestItemProps {
  pullRequest: PullRequest;
}

function getStateIcon(state: PullRequest["state"]) {
  switch (state) {
    case "success":
      return <CheckCircle className="w-4 h-4" />;
    case "failure":
      return <XCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "error":
      return <AlertTriangle className="w-4 h-4" />;
    case "skipped":
      return <ArrowRight className="w-4 h-4" />;
    default:
      return <HelpCircle className="w-4 h-4" />;
  }
}

function getStateClass(state: PullRequest["state"]) {
  switch (state) {
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "failure":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "skipped":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
}

function luminance(color: string): string {
  if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
    throw new Error("Invalid color format. Expected 6-digit hex color.");
  }
  const red = parseInt(color.slice(0, 2), 16);
  const green = parseInt(color.slice(2, 2), 16);
  const blue = parseInt(color.slice(4, 2), 16);
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;
  return yiq >= 128 ? "#000" : "#fff";
}

export function PullRequestItem({ pullRequest: pr }: PullRequestItemProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-start space-x-3">
        <GitPullRequest className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
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
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {pr.sender.name || pr.sender.login}
              </a>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStateClass(pr.state)}`}
            >
              {getStateIcon(pr.state)}
              {pr.state}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Link
              to={`/dashboard/pull-requests/${pr.url.split("/").pop()}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              {pr.title}
            </Link>
            <a
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="View on GitHub"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="mt-1 text-sm">
            <a
              href={`https://github.com/${pr.full_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            >
              {pr.repository}
            </a>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-500 dark:text-gray-400">
              {new Date(pr.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
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
                    color: luminance(label.color),
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
  );
}
