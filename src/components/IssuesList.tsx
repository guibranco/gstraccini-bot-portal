import { Issue } from "../types";
import { CircleDot } from "lucide-react";

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({ issues }: IssuesListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Assigned Issues</h3>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          {issues.length}
        </span>
      </div>
      <div className="space-y-4">
        {issues.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No issues found</p>
        ) : (
          issues.map((issue, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <CircleDot className="w-5 h-5 text-yellow-500 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={issue.sender.avatar_url}
                      alt={issue.sender.name || issue.sender.login}
                      className="w-6 h-6 rounded-full"
                    />
                    <a
                      href={issue.sender.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      {issue.sender.name || issue.sender.login}
                    </a>
                  </div>
                  <a
                    href={issue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {issue.title}
                  </a>
                  <div className="mt-1 text-sm">
                    <a
                      href={`https://github.com/${issue.full_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {issue.repository}
                    </a>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500">
                      {new Date(issue.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {issue.labels && issue.labels.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {issue.labels.map((label) => (
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
          ))
        )}
      </div>
    </div>
  );
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
