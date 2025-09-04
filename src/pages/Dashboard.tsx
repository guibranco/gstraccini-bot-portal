import {
  GitPullRequest,
  GitMerge,
  GitCommit,
  Clock,
  Database,
} from "lucide-react";
import { StatCard } from "../components/StatCard";
import { ActivityList } from "../components/ActivityList";
import { PendingActions } from "../components/PendingActions";
import { IssuesList } from "../components/IssuesList";
import { PullRequestsList } from "../components/PullRequestsList";
import { WelcomeSection } from "../components/dashboard/WelcomeSection";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { ContentGrid } from "../components/dashboard/ContentGrid";
import {
  mockUser,
  mockPullRequests,
  mockIssues,
  mockActivities,
  mockPendingActions,
} from "../mockData";

export function Dashboard() {
  return (
    <>
      <WelcomeSection user={mockUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        <StatsGrid />
        <ContentGrid
          pullRequests={mockPullRequests}
          issues={mockIssues}
          activities={mockActivities}
          pendingActions={mockPendingActions}
        />
      </div>
    </>
  );
}
