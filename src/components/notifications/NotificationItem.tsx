import {
  Bell,
  GitPullRequest,
  MessageSquare,
  GitMerge,
  Shield,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { Notification } from "../../types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "pr_review":
      return <GitPullRequest className="w-5 h-5 text-blue-500" />;
    case "issue_mention":
      return <MessageSquare className="w-5 h-5 text-yellow-500" />;
    case "pr_merged":
      return <GitMerge className="w-5 h-5 text-purple-500" />;
    case "security_alert":
      return <Shield className="w-5 h-5 text-red-500" />;
    case "issue_assigned":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "pr_changes":
      return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

const getPriorityClass = (priority?: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  return (
    <div
      className={`px-6 py-4 ${
        !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
      }`}
    >
      <div className="flex items-start space-x-3">
        {getNotificationIcon(notification.type)}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={notification.sender.avatar_url}
                alt={notification.sender.name || notification.sender.login}
                className="w-6 h-6 rounded-full"
              />
              <a
                href={notification.sender.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {notification.sender.name || notification.sender.login}
              </a>
            </div>
            {notification.priority && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(notification.priority)}`}
              >
                {notification.priority}
              </span>
            )}
          </div>
          <a
            href={notification.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {notification.title}
          </a>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {notification.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <a
                href={`https://github.com/${notification.full_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 dark:hover:text-gray-300"
              >
                {notification.repository}
              </a>
              <span className="mx-2">•</span>
              <span>
                {new Date(notification.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
