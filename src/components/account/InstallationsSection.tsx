import { Building2, Plus, Trash2, ExternalLink, Users, BookOpen } from 'lucide-react';
import type { Installation, AvailableOrganization } from '../../types';
import { mockAvailableOrganizations } from '../../mockData';

interface InstallationsSectionProps {
  installations: Installation[];
  onRemoveInstallation: (installation: Installation) => void;
}

export function InstallationsSection({ installations, onRemoveInstallation }: InstallationsSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Building2 className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Installations</h2>
        </div>
        <div className="space-y-6">
          {/* Current Installations */}
          <div className="overflow-x-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Installations</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Repositories</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Added</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {installations.map((installation) => (
                  <tr key={installation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={installation.account.avatar_url}
                          alt={installation.account.name || installation.account.login}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {installation.account.name || installation.account.login}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            @{installation.account.login}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        installation.account.type === 'Organization'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {installation.account.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {installation.repositories_count} repositories
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(installation.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-4">
                        <a
                          href={`/repositories?org=${installation.account.login}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => onRemoveInstallation(installation)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Available Organizations */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Available Organizations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAvailableOrganizations.map((org) => (
                <div
                  key={org.login}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={org.avatar_url}
                      alt={org.name || org.login}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                        {org.name || org.login}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        @{org.login}
                      </p>
                      {org.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                          {org.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {org.members_count.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {org.repositories_count.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Install App
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Unlisted Organization */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            <div className="text-center space-y-2">
              <p className="text-gray-900 dark:text-white font-medium">
                Didn't find the organization you're looking for?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No worries! If the desired organization is missing from the list, you can manually add it to the installations by clicking the button below:
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Installation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}