import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants';
import { formatDueDateLabel, isOverdue, isToday } from '../../utils/helpers';

const TaskCard = forwardRef(function TaskCard({ task, onEdit, onDelete, projects = [] }, ref) {
  const isCompleted = task.taskStatus === 'COMPLETED';
  const statusClass = task.taskStatus?.toLowerCase();
  const priorityClass = task.taskPriority?.toLowerCase();
  const dueDateArr = task.dueDate;
  const overdue = isOverdue(dueDateArr, task.taskStatus);
  const today = !isCompleted && isToday(dueDateArr);
  const dueLabel = formatDueDateLabel(dueDateArr, task.taskStatus);
  const project = task.projectId ? projects.find((p) => p.projectId === task.projectId) : null;

  return (
    <motion.div
      ref={ref}
      className={`task-card${overdue ? ' overdue' : ''}${isCompleted ? ' completed' : ''}`}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="task-content">
        <div className="task-title">{task.name}</div>
        {task.description && <div className="task-description">{task.description}</div>}
        <div className="task-meta">
          {task.taskPriority && (
            <span className={`priority-badge ${priorityClass}`}>
              {PRIORITY_LABELS[task.taskPriority] || task.taskPriority}
            </span>
          )}
          <span className={`status-badge ${statusClass}`}>
            {STATUS_LABELS[task.taskStatus] || task.taskStatus}
          </span>
          {project && <span className="project-badge">{project.projectName}</span>}
          {dueLabel && (
            <span className={`due-date${overdue ? ' overdue' : ''}${today ? ' today' : ''}`}>
              {dueLabel}
            </span>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button
          className="task-action-btn"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          <Edit3 size={16} />
        </button>
        <button
          className="task-action-btn delete"
          onClick={() => onDelete(task)}
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
});

export default TaskCard;
