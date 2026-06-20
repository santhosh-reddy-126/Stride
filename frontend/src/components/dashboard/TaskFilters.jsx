import { Search, X, Flag, CalendarClock, ListFilter } from 'lucide-react';
import { TASK_STATUS, STATUS_FILTER_OPTIONS, PRIORITY_FILTER_OPTIONS, DUE_STATUS_FILTER_OPTIONS, DUE_STATUS } from '../../utils/constants';

const DISABLED_DUE_STATUS_WHEN_COMPLETED = [DUE_STATUS.OVERDUE, DUE_STATUS.TODAY, DUE_STATUS.UPCOMING];

export default function TaskFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  dueStatusFilter,
  onDueStatusFilterChange,
  children,
}) {
  const isCompleted = statusFilter === TASK_STATUS.COMPLETED;

  const handleStatusChange = (value) => {
    if (value === TASK_STATUS.COMPLETED && DISABLED_DUE_STATUS_WHEN_COMPLETED.includes(dueStatusFilter)) {
      onDueStatusFilterChange('ALL');
    }
    onStatusFilterChange(value);
  };

  const handleClearFilters = () => {
    onStatusFilterChange('ALL');
    onPriorityFilterChange('ALL');
    onDueStatusFilterChange('ALL');
  };

  const hasActiveFilters = statusFilter !== 'ALL' || priorityFilter !== 'ALL' || dueStatusFilter !== 'ALL';

  return (
    <div className="filter-section">
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search tasks"
          />
        </div>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            <X size={15} />
            Clear Filters
          </button>
        )}
        {children && <div className="action-bar-right">{children}</div>}
      </div>
      <div className="filter-dropdown-row">
        <div className="filter-group">
          <ListFilter size={15} className="filter-icon" />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            aria-label="Filter by status"
          >
            {STATUS_FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <Flag size={15} className="filter-icon" />
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            aria-label="Filter by priority"
          >
            {PRIORITY_FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <CalendarClock size={15} className="filter-icon" />
          <select
            className="filter-select"
            value={dueStatusFilter}
            onChange={(e) => onDueStatusFilterChange(e.target.value)}
            aria-label="Filter by due status"
          >
            {DUE_STATUS_FILTER_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={isCompleted && DISABLED_DUE_STATUS_WHEN_COMPLETED.includes(opt.value)}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
