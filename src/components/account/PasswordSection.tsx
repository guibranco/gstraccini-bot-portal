import { KeyRound, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

interface PasswordSectionProps {
  hasPassword: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function PasswordSection({
  hasPassword,
  onSubmit,
}: PasswordSectionProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasDigit,
      hasSpecialChar,
      isValid:
        hasMinLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasDigit &&
        hasSpecialChar,
    };
  };

  const passwordValidation = validatePassword(newPassword);
  const passwordsMatch = newPassword === confirmPassword;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <KeyRound className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Password
          </h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          {hasPassword && (
            <div>
              <label
                htmlFor="current_password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="current_password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out text-base hover:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="new_password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="new_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out text-base hover:border-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <div
                className={`flex items-center text-sm ${passwordValidation.hasMinLength ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {passwordValidation.hasMinLength ? (
                  <CheckCircle2 className="inline w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="inline w-4 h-4 mr-2" />
                )}
                At least 8 characters
              </div>
              <div
                className={`flex items-center text-sm ${passwordValidation.hasUpperCase ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {passwordValidation.hasUpperCase ? (
                  <CheckCircle2 className="inline w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="inline w-4 h-4 mr-2" />
                )}
                At least one uppercase letter
              </div>
              <div
                className={`flex items-center text-sm ${passwordValidation.hasLowerCase ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {passwordValidation.hasLowerCase ? (
                  <CheckCircle2 className="inline w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="inline w-4 h-4 mr-2" />
                )}
                At least one lowercase letter
              </div>
              <div
                className={`flex items-center text-sm ${passwordValidation.hasDigit ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {passwordValidation.hasDigit ? (
                  <CheckCircle2 className="inline w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="inline w-4 h-4 mr-2" />
                )}
                At least one digit
              </div>
              <div
                className={`flex items-center text-sm ${passwordValidation.hasSpecialChar ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {passwordValidation.hasSpecialChar ? (
                  <CheckCircle2 className="inline w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="inline w-4 h-4 mr-2" />
                )}
                At least one special character
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out text-base hover:border-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <XCircle className="w-4 h-4 mr-1" />
                Passwords do not match
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!passwordValidation.isValid || !passwordsMatch}
              className="px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
