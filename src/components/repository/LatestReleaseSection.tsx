import { Tag } from "lucide-react";
import type { Release } from "../../types";

interface LatestReleaseSectionProps {
  release?: Release;
}

export function LatestReleaseSection({ release }: LatestReleaseSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
          <Tag className="w-5 h-5 mr-2" />
          Latest Release
        </h2>
        {release ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {release.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {release.tag_name}
                </p>
              </div>
              <div className="flex space-x-2">
                {release.prerelease && (
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                    Pre-release
                  </span>
                )}
                {release.draft && (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full">
                    Draft
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{release.body}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published: {new Date(release.published_at).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No releases yet</p>
        )}
      </div>
    </div>
  );
}
