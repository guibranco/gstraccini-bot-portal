import { User } from "lucide-react";
import type { User as UserType } from "../../types";

interface ProfileSectionProps {
  user: UserType;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProfileSection({ user, onSubmit }: ProfileSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <User className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Profile Information
          </h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="github_id"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                GitHub ID
              </label>
              <input
                type="text"
                id="github_id"
                value={user.github_id}
                readOnly
                className="block w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed text-base"
              />
            </div>
            <div>
              <label
                htmlFor="github_username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                GitHub Username
              </label>
              <input
                type="text"
                id="github_username"
                value={user.login}
                readOnly
                className="block w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed text-base"
              />
            </div>
            <div>
              <label
                htmlFor="github_email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                GitHub Email
              </label>
              <input
                type="email"
                id="github_email"
                value={user.github_email}
                readOnly
                className="block w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed text-base"
              />
            </div>
            <div>
              <label
                htmlFor="communications_email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Communications Email
              </label>
              <input
                type="email"
                id="communications_email"
                defaultValue={user.communications_email}
                className="block w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out text-base hover:border-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                defaultValue={user.first_name}
                className="block w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out text-base hover:border-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                defaultValue={user.last_name}
                className="block w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out text-base hover:border-blue-400"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
