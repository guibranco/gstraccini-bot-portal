import { Key, Plus, Trash2 } from "lucide-react";
import type { FIDODevice } from "../../types";

interface FIDOSectionProps {
  devices: FIDODevice[];
  onRegisterDevice: () => void;
  onRemoveDevice: (id: string) => void;
}

export function FIDOSection({
  devices,
  onRegisterDevice,
  onRemoveDevice,
}: FIDOSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Key className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Security Keys (FIDO)
          </h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Security keys provide strong authentication with support for FIDO2
              standards
            </p>
            <button
              type="button"
              onClick={onRegisterDevice}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Key
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {devices.map((device) => (
              <div
                key={device.id}
                className="py-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {device.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Added on {new Date(device.added_at).toLocaleDateString()}
                    <span className="mx-2">•</span>
                    Last used{" "}
                    {new Date(device.last_used_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveDevice(device.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
