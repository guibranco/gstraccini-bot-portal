import {
  GitPullRequest,
  GitMerge,
  GitCommit,
  Clock,
  Database,
} from "lucide-react";
import { StatCard } from "../StatCard";

const statsData = [
  {
    title: "Total Pull Requests",
    value: 120,
    icon: <GitPullRequest className="w-6 h-6" />,
  },
  {
    title: "Pull Requests Merged",
    value: 85,
    icon: <GitMerge className="w-6 h-6" />,
  },
  {
    title: "Commits Analyzed",
    value: 320,
    icon: <GitCommit className="w-6 h-6" />,
  },
  {
    title: "Average Time to Merge",
    value: 12,
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "Active Repositories",
    value: 6,
    icon: <Database className="w-6 h-6" />,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
