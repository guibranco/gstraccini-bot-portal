import { ReactNode } from 'react';

interface SettingsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function SettingsCard({ title, icon, children }: SettingsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="text-gray-400">{icon}</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}