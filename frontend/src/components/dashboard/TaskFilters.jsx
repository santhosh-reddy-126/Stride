import { Search } from 'lucide-react';
import { TASK_STATUS, STATUS_LABELS } from '../../utils/constants';

const filters = [
  { value: 'ALL', label: 'All' },
  { value: TASK_STATUS.CREATED, label: STATUS_LABELS.CREATED, className: 'created' },
  { value: TASK_STATUS.IN_PROGRESS, label: STATUS_LABELS.IN_PROGRESS, className: 'in_progress' },
  { value: TASK_STATUS.COMPLETED, label: STATUS_LABELS.COMPLETED, className: 'completed' },
];

export default function TaskFilters({ search, onSearchChange, statusFilter, onStatusFilterChange }) {
  return (
    <>
      <div className="action-bar">
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
      </div>
      <div className="filters-row" role="group" aria-label="Task status filters">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-badge ${statusFilter === f.value ? `active ${f.className || ''}` : ''}`}
            onClick={() => onStatusFilterChange(f.value)}
            aria-pressed={statusFilter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
    </>
  );
}
