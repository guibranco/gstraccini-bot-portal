import { Shield, CheckCircle, XCircle } from "lucide-react";
import type { Ruleset } from "../../types";

interface RulesetsSectionProps {
  rulesets: Ruleset[];
}

export function RulesetsSection({ rulesets = [] }: RulesetsSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
          <Shield className="w-5 h-5 mr-2" />
          Rulesets
        </h2>
        <div className="space-y-4">
          {rulesets.map((ruleset, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {ruleset.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ruleset.enforcement === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : ruleset.enforcement === "evaluate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {ruleset.enforcement}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Targets: {ruleset.target.join(", ")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Bypass actors: {ruleset.bypass_actors.join(", ")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(ruleset.rules).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    {typeof value === "boolean" ? (
                      value ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )
                    ) : (
                      <Shield className="w-4 h-4 text-blue-500" />
                    )}
                    <span className="text-gray-600 dark:text-gray-300">
                      {key.replace(/_/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
