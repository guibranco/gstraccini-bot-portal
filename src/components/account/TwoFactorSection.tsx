import { useState } from 'react';
import { Shield, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface TwoFactorSectionProps {
  has2FA: boolean;
  recoveryCodes: string[];
  usedRecoveryCodes: Set<string>;
  onToggle2FA: () => void;
  onRegenerateCodes: () => void;
}

export function TwoFactorSection({
  has2FA,
  recoveryCodes,
  usedRecoveryCodes,
  onToggle2FA,
  onRegenerateCodes
}: TwoFactorSectionProps) {
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Shield className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white font-medium">Two-Factor Authentication Status</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              type="button"
              onClick={onToggle2FA}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                has2FA
                  ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                  : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
              }`}
            >
              {has2FA ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>

          {has2FA && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recovery Codes</h3>
                <button
                  type="button"
                  onClick={onRegenerateCodes}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Regenerate Codes
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Keep these recovery codes in a safe place. You can use them to regain access to your account if you lose your 2FA device.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                    className="ml-4"
                  >
                    {showRecoveryCodes ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {showRecoveryCodes && (
                  <div className="grid grid-cols-2 gap-2">
                    {recoveryCodes.map((code) => (
                      <div
                        key={code}
                        className={`p-2 rounded font-mono text-sm ${
                          usedRecoveryCodes.has(code)
                            ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 line-through'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}