import { Shield, CheckCircle, XCircle } from "lucide-react";
import type { BranchProtection } from "../../types";

interface BranchProtectionSectionProps {
  protectionRules: BranchProtection[];
}

export function BranchProtectionSection({
  protectionRules = [],
}: BranchProtectionSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
          <Shield className="w-5 h-5 mr-2" />
          Branch Protection Rules
        </h2>
        <div className="space-y-4">
          {protectionRules.map((protection, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {protection.branch}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  {protection.required_status_checks ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-600 dark:text-gray-300">
                    Required status checks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {protection.enforce_admins ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-600 dark:text-gray-300">
                    Enforce for admins
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {protection.required_pull_request_reviews ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-600 dark:text-gray-300">
                    Required reviews
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {protection.dismiss_stale_reviews ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-600 dark:text-gray-300">
                    Dismiss stale reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
