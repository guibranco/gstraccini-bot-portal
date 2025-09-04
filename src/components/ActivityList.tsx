import { Activity } from "../types";
import {
  GitPullRequest,
  GitMerge,
  XCircle,
  GitCommit,
  GitPullRequestDraft,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ActivityListProps {
  activities: Activity[];
}

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "pr_created":
      return <GitPullRequest className="w-5 h-5 text-blue-500" />;
    case "pr_merged":
      return <GitMerge className="w-5 h-5 text-purple-500" />;
    case "issue_closed":
      return <XCircle className="w-5 h-5 text-green-500" />;
    case "commits_analyzed":
      return <GitCommit className="w-5 h-5 text-orange-500" />;
    case "pr_opened":
      return <GitPullRequestDraft className="w-5 h-5 text-blue-500" />;
  }
};

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Activities
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            {getActivityIcon(activity.type)}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <img
                  src={activity.sender.avatar_url}
                  alt={activity.sender.name || activity.sender.login}
                  className="w-6 h-6 rounded-full"
                />
                <a
                  href={activity.sender.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {activity.sender.name || activity.sender.login}
                </a>
              </div>
              <p className="text-gray-800 mt-1">{activity.description}</p>
              <p className="text-sm text-gray-500">
                <Link
                  to={`/repositories/${activity.repository}`}
                  className="hover:text-gray-700"
                >
                  {activity.repository}
                </Link>
                <span className="mx-2">•</span>
                {new Date(activity.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
