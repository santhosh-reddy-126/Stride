import { motion } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { STATUS_LABELS } from '../../utils/constants';

export default function TaskCard({ task, onEdit, onDelete }) {
  const statusClass = task.taskStatus?.toLowerCase();

  return (
    <motion.div
      className="task-card"
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
          <span className={`status-badge ${statusClass}`}>
            {STATUS_LABELS[task.taskStatus] || task.taskStatus}
          </span>
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
}
