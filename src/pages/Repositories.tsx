import { useState, useEffect } from "react";
import {
  Star,
  GitFork,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  X,
  Filter,
  Search,
} from "lucide-react";
import { TokenSelect } from "../components/TokenSelect";
import { mockRepositories } from "../mockData";
import type { Repository } from "../types";
import { Link } from "react-router-dom";

export function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    [],
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedVisibilities, setSelectedVisibilities] = useState<string[]>(
    [],
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const visibilityOptions = [
    { value: "public", label: "Public", color: "22c55e" },
    { value: "private", label: "Private", color: "ef4444" },
  ];

  const typeOptions = [
    { value: "source", label: "Source", color: "3b82f6" },
    { value: "fork", label: "Fork", color: "8b5cf6" },
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setRepositories(mockRepositories);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const organizationOptions = Array.from(
    new Set(repositories.map((repo) => repo.organization)),
  ).map((org) => {
    const repo = repositories.find((r) => r.organization === org);
    return {
      value: org,
      label: org,
      avatar: repo?.organization_avatar,
    };
  });

  const languageOptions = Array.from(
    new Set(repositories.map((repo) => repo.language)),
  ).map((lang) => ({
    value: lang,
    label: lang,
    color: getLanguageColor(lang),
  }));

  const filteredRepositories = repositories.filter((repo) => {
    if (
      selectedOrganizations.length > 0 &&
      !selectedOrganizations.includes(repo.organization)
    )
      return false;
    if (
      selectedLanguages.length > 0 &&
      !selectedLanguages.includes(repo.language)
    )
      return false;
    if (
      selectedVisibilities.length > 0 &&
      !selectedVisibilities.includes(repo.visibility)
    )
      return false;
    if (selectedTypes.length > 0) {
      const type = repo.fork ? "fork" : "source";
      if (!selectedTypes.includes(type)) return false;
    }
    return true;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const clearFilters = () => {
    setSelectedOrganizations([]);
    setSelectedLanguages([]);
    setSelectedVisibilities([]);
    setSelectedTypes([]);
  };

  const hasActiveFilters =
    selectedOrganizations.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedVisibilities.length > 0 ||
    selectedTypes.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filters
              </h2>
            </div>
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {isFiltersExpanded ? "Show Less" : "Show More"}
            </button>
          </div>

          <div
            className={`grid gap-4 ${isFiltersExpanded ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}
          >
            {/* Organization Filter */}
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Organization
              </label>
              <TokenSelect
                options={organizationOptions}
                selectedValues={selectedOrganizations}
                onChange={setSelectedOrganizations}
                placeholder="Select organizations..."
              />
            </div>

            {/* Language Filter */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Language
              </label>
              <TokenSelect
                options={languageOptions}
                selectedValues={selectedLanguages}
                onChange={setSelectedLanguages}
                placeholder="Select languages..."
              />
            </div>

            {/* Visibility Filter */}
            <div className={!isFiltersExpanded ? "hidden md:block" : ""}>
              <label
                htmlFor="visibility"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Visibility
              </label>
              <TokenSelect
                options={visibilityOptions}
                selectedValues={selectedVisibilities}
                onChange={setSelectedVisibilities}
                placeholder="Select visibility..."
              />
            </div>

            {/* Type Filter */}
            <div className={!isFiltersExpanded ? "hidden md:block" : ""}>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Repository Type
              </label>
              <TokenSelect
                options={typeOptions}
                selectedValues={selectedTypes}
                onChange={setSelectedTypes}
                placeholder="Select types..."
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Repositories Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Repositories
          </h2>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-full text-sm font-medium">
            {filteredRepositories.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Organization
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Stars
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Fork
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Forks
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Issues
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Language
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Visibility
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredRepositories.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No repositories found
                  </td>
                </tr>
              ) : (
                filteredRepositories.map((repo) => (
                  <tr
                    key={`${repo.organization}/${repo.name}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center space-x-2">
                        {repo.organization_avatar && (
                          <img
                            src={repo.organization_avatar}
                            alt={repo.organization}
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <span>{repo.organization}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/repositories/${repo.organization}/${repo.name}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        {repo.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <Star className="w-4 h-4 mr-1" />
                        {formatNumber(repo.stars)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {repo.fork ? (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <Check className="w-4 h-4 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600 dark:text-red-400">
                          <X className="w-4 h-4 mr-1" />
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="flex items-center text-gray-600 dark:text-gray-400">
                        <GitFork className="w-4 h-4 mr-1" />
                        {formatNumber(repo.forks)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="flex items-center text-gray-600 dark:text-gray-400">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formatNumber(repo.issues)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        {repo.language || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="flex items-center">
                        {repo.visibility === "private" ? (
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "f7df1e",
    TypeScript: "3178c6",
    Go: "00add8",
    Python: "3776ab",
    Java: "b07219",
    Ruby: "cc342d",
    PHP: "4f5d95",
    "C++": "f34b7d",
    CSS: "563d7c",
    HTML: "e34c26",
    Swift: "ffac45",
    Kotlin: "f18e33",
    Rust: "dea584",
  };
  return colors[language] || "6b7280";
}
