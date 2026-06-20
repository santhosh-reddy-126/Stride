export const TASK_STATUS = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
};

export const STATUS_LABELS = {
  CREATED: 'Created',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export const STATUS_OPTIONS = [
  { value: TASK_STATUS.CREATED, label: STATUS_LABELS.CREATED },
  { value: TASK_STATUS.IN_PROGRESS, label: STATUS_LABELS.IN_PROGRESS },
  { value: TASK_STATUS.COMPLETED, label: STATUS_LABELS.COMPLETED },
];

export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

export const PRIORITY_LABELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const PRIORITY_OPTIONS = [
  { value: '', label: 'No Priority' },
  { value: TASK_PRIORITY.LOW, label: PRIORITY_LABELS.LOW },
  { value: TASK_PRIORITY.MEDIUM, label: PRIORITY_LABELS.MEDIUM },
  { value: TASK_PRIORITY.HIGH, label: PRIORITY_LABELS.HIGH },
];

export const STATUS_FILTER_OPTIONS = [
  { value: 'ALL', label: 'All Status' },
  { value: TASK_STATUS.CREATED, label: STATUS_LABELS.CREATED },
  { value: TASK_STATUS.IN_PROGRESS, label: STATUS_LABELS.IN_PROGRESS },
  { value: TASK_STATUS.COMPLETED, label: STATUS_LABELS.COMPLETED },
];

export const PRIORITY_FILTER_OPTIONS = [
  { value: 'ALL', label: 'All Priority' },
  { value: TASK_PRIORITY.LOW, label: PRIORITY_LABELS.LOW },
  { value: TASK_PRIORITY.MEDIUM, label: PRIORITY_LABELS.MEDIUM },
  { value: TASK_PRIORITY.HIGH, label: PRIORITY_LABELS.HIGH },
];

export const DUE_STATUS = {
  NO_DUE_DATE: 'NO_DUE_DATE',
  OVERDUE: 'OVERDUE',
  TODAY: 'TODAY',
  UPCOMING: 'UPCOMING',
};

export const DUE_STATUS_LABELS = {
  NO_DUE_DATE: 'No Due Date',
  OVERDUE: 'Overdue',
  TODAY: 'Due Today',
  UPCOMING: 'Upcoming',
};

export const DUE_STATUS_FILTER_OPTIONS = [
  { value: 'ALL', label: 'All Due Status' },
  { value: DUE_STATUS.NO_DUE_DATE, label: DUE_STATUS_LABELS.NO_DUE_DATE },
  { value: DUE_STATUS.OVERDUE, label: DUE_STATUS_LABELS.OVERDUE },
  { value: DUE_STATUS.TODAY, label: DUE_STATUS_LABELS.TODAY },
  { value: DUE_STATUS.UPCOMING, label: DUE_STATUS_LABELS.UPCOMING },
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
