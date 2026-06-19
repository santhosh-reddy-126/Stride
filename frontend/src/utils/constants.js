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

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
