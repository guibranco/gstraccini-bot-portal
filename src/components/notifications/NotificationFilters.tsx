import { Filter, Eye, EyeOff } from 'lucide-react';
import { TokenSelect } from '../TokenSelect';

interface NotificationFiltersProps {
  showUnreadOnly: boolean;
  selectedTypes: string[];
  selectedPriorities: string[];
  selectedSenders: string[];
  typeOptions: Array<{ value: string; label: string; color: string }>;
  priorityOptions: Array<{ value: string; label: string; color: string }>;
  senderOptions: Array<{ value: string; label: string; avatar?: string; description?: string }>;
  isFiltersExpanded: boolean;
  onToggleUnreadOnly: () => void;
  onTypesChange: (types: string[]) => void;
  onPrioritiesChange: (priorities: string[]) => void;
  onSendersChange: (senders: string[]) => void;
  onToggleExpanded: () => void;
  onClearFilters: () => void;
}

export function NotificationFilters({
  showUnreadOnly,
  selectedTypes,
  selectedPriorities,
  selectedSenders,
  typeOptions,
  priorityOptions,
  senderOptions,
  isFiltersExpanded,
  onToggleUnreadOnly,
  onTypesChange,
  onPrioritiesChange,
  onSendersChange,
  onToggleExpanded,
  onClearFilters
}: NotificationFiltersProps) {
  const hasActiveFilters = showUnreadOnly || selectedTypes.length > 0 || 
    selectedPriorities.length > 0 || selectedSenders.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          <button
            onClick={onToggleExpanded}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            {isFiltersExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className={`grid gap-4 ${isFiltersExpanded ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
          {/* Read/Unread Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Status
            </label>
            <button
              onClick={onToggleUnreadOnly}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                showUnreadOnly
                  ? 'border-blue-500 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 text-gray-700 dark:text-gray-300'
              } hover:bg-gray-50 dark:hover:bg-gray-700 w-full justify-between`}
            >
              <span>Show unread only</span>
              {showUnreadOnly ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Type
            </label>
            <TokenSelect
              options={typeOptions}
              selectedValues={selectedTypes}
              onChange={onTypesChange}
              placeholder="Select notification types..."
            />
          </div>

          {/* Sender Filter */}
          <div className={!isFiltersExpanded ? 'hidden' : ''}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Sender
            </label>
            <TokenSelect
              options={senderOptions}
              selectedValues={selectedSenders}
              onChange={onSendersChange}
              placeholder="Select senders..."
            />
          </div>

          {/* Priority Filter */}
          <div className={!isFiltersExpanded ? 'hidden' : ''}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Priority
            </label>
            <TokenSelect
              options={priorityOptions}
              selectedValues={selectedPriorities}
              onChange={onPrioritiesChange}
              placeholder="Select priorities..."
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}