import { Wrench, ListTodo, Bug } from "lucide-react";

interface Badge {
  text: string;
  icon: "wrench" | "tasks" | "bug";
}

interface SettingToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  note?: string;
  badges?: Badge[];
  disabled?: boolean;
  forceActive?: boolean;
}

const BadgeIcon = ({ icon }: { icon: Badge["icon"] }) => {
  switch (icon) {
    case "wrench":
      return <Wrench className="w-3 h-3" />;
    case "tasks":
      return <ListTodo className="w-3 h-3" />;
    case "bug":
      return <Bug className="w-3 h-3" />;
  }
};

export function SettingToggle({
  id,
  label,
  description,
  checked,
  onChange,
  note,
  badges,
  disabled = false,
  forceActive = false,
}: SettingToggleProps) {
  return (
    <div
      className={`flex items-start space-x-4 ${disabled ? "opacity-50" : ""}`}
    >
      <div className="flex-1">
        <label htmlFor={id} className="flex items-center space-x-2">
          <span className="font-medium text-gray-900 dark:text-white">
            {label}
          </span>
          {badges && (
            <div className="flex items-center space-x-2">
              {badges.map((badge) => (
                <span
                  key={badge.text}
                  className="inline-flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs"
                >
                  <BadgeIcon icon={badge.icon} />
                  <span>{badge.text}</span>
                </span>
              ))}
            </div>
          )}
        </label>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        {note && (
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 italic">
            {note}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={id}
            className="sr-only peer"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
          <div
            className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
              forceActive
                ? "peer-checked:bg-green-600"
                : "peer-checked:bg-blue-600"
            }`}
          ></div>
        </label>
      </div>
    </div>
  );
}
