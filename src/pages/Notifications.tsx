import { useState, useEffect } from "react";
import { mockNotifications } from "../mockData";
import { NotificationFilters } from "../components/notifications/NotificationFilters";
import { NotificationList } from "../components/notifications/NotificationList";
import type { Notification } from "../types";

const typeOptions = [
  { value: "pr_review", label: "Pull Request Review", color: "3b82f6" },
  { value: "issue_mention", label: "Issue Mention", color: "f59e0b" },
  { value: "pr_merged", label: "Pull Request Merged", color: "8b5cf6" },
  { value: "security_alert", label: "Security Alert", color: "ef4444" },
  { value: "issue_assigned", label: "Issue Assigned", color: "10b981" },
  { value: "pr_changes", label: "Pull Request Changes", color: "f97316" },
];

const priorityOptions = [
  { value: "high", label: "High Priority", color: "ef4444" },
  { value: "medium", label: "Medium Priority", color: "f59e0b" },
  { value: "low", label: "Low Priority", color: "10b981" },
];

const systemSender = {
  value: "system",
  label: "System",
  avatar: "https://github.com/github.png",
  description: "System notifications",
};

const botSender = {
  value: "bot",
  label: "GStraccini Bot",
  avatar: "https://github.com/gstraccini.png",
  description: "Bot notifications",
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedSenders, setSelectedSenders] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [senderOptions, setSenderOptions] = useState<
    Array<{
      value: string;
      label: string;
      avatar?: string;
      description?: string;
    }>
  >([systemSender, botSender]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = mockNotifications;
        setNotifications(fetchedNotifications);

        // Extract unique senders from notifications
        const uniqueSenders = Array.from(
          new Set(fetchedNotifications.map((n) => n.sender)),
        ).map((sender) => ({
          value: sender.login,
          label: sender.name || sender.login,
          avatar: sender.avatar_url,
          description: `@${sender.login}`,
        }));

        // Combine system, bot, and user senders
        setSenderOptions([systemSender, botSender, ...uniqueSenders]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    if (showUnreadOnly && notification.read) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(notification.type))
      return false;
    if (
      selectedPriorities.length > 0 &&
      !selectedPriorities.includes(notification.priority || "")
    )
      return false;
    if (selectedSenders.length > 0) {
      const isSystem =
        notification.type === "security_alert" &&
        selectedSenders.includes("system");
      const isBot =
        notification.sender.login.includes("[bot]") &&
        selectedSenders.includes("bot");
      const isUser = selectedSenders.includes(notification.sender.login);
      if (!isSystem && !isBot && !isUser) return false;
    }
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearFilters = () => {
    setShowUnreadOnly(false);
    setSelectedTypes([]);
    setSelectedPriorities([]);
    setSelectedSenders([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NotificationFilters
        showUnreadOnly={showUnreadOnly}
        selectedTypes={selectedTypes}
        selectedPriorities={selectedPriorities}
        selectedSenders={selectedSenders}
        typeOptions={typeOptions}
        priorityOptions={priorityOptions}
        senderOptions={senderOptions}
        isFiltersExpanded={isFiltersExpanded}
        onToggleUnreadOnly={() => setShowUnreadOnly(!showUnreadOnly)}
        onTypesChange={setSelectedTypes}
        onPrioritiesChange={setSelectedPriorities}
        onSendersChange={setSelectedSenders}
        onToggleExpanded={() => setIsFiltersExpanded(!isFiltersExpanded)}
        onClearFilters={clearFilters}
      />

      <NotificationList
        notifications={filteredNotifications}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />
    </div>
  );
}
