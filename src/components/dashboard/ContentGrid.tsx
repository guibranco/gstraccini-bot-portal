import { ActivityList } from '../ActivityList';
import { PendingActions } from '../PendingActions';
import { IssuesList } from '../IssuesList';
import { PullRequestsList } from '../PullRequestsList';
import type { PullRequest, Issue, Activity, PendingAction } from '../../types';

interface ContentGridProps {
  pullRequests: PullRequest[];
  issues: Issue[];
  activities: Activity[];
  pendingActions: PendingAction[];
}

export function ContentGrid({ pullRequests, issues, activities, pendingActions }: ContentGridProps) {
  return (
    <>
      {/* PRs and Issues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PullRequestsList pullRequests={pullRequests} />
        <IssuesList issues={issues} />
      </div>

      {/* Activities and Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityList activities={activities} />
        <PendingActions actions={pendingActions} />
      </div>
    </>
  );
}