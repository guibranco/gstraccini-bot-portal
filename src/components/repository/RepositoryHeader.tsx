import {
  Star,
  GitFork,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import type { Repository } from "../../types";

interface RepositoryHeaderProps {
  repository: Repository;
}

export function RepositoryHeader({ repository }: RepositoryHeaderProps) {
  const formatNumber = (num: number = 0) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={repository.organization_avatar}
              alt={repository.organization}
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <span>{repository.organization}</span>
                <span className="text-gray-500 dark:text-gray-400">/</span>
                <span>{repository.name}</span>
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </h1>
              <div className="mt-2 flex items-center space-x-4">
                <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                  <Star className="w-4 h-4 mr-1" />
                  {formatNumber(repository.stars)}
                </span>
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  <GitFork className="w-4 h-4 mr-1" />
                  {formatNumber(repository.forks)}
                </span>
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formatNumber(repository.issues)}
                </span>
                <span className="flex items-center">
                  {repository.visibility === "private" ? (
                    <span className="flex items-center text-red-600 dark:text-red-400">
                      <EyeOff className="w-4 h-4 mr-1" />
                      Private
                    </span>
                  ) : (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <Eye className="w-4 h-4 mr-1" />
                      Public
                    </span>
                  )}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {repository.language}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
