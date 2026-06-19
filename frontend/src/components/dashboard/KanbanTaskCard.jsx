import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Edit3, Trash2 } from 'lucide-react';
import { STATUS_LABELS } from '../../utils/constants';

const KanbanTaskCard = memo(function KanbanTaskCard({ task, onEdit, onDelete }) {
  const statusClass = task.taskStatus?.toLowerCase();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.taskId,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      className="kanban-card"
      style={style}
      {...listeners}
      {...attributes}
    >
      <h4>{task.name}</h4>
      {task.description && <p>{task.description}</p>}
      <div className="kanban-card-footer">
        <span className={`status-badge ${statusClass}`}>
          {STATUS_LABELS[task.taskStatus] || task.taskStatus}
        </span>
        <div className="kanban-card-actions">
          <button
            className="task-action-btn"
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onEdit(task); }}
            aria-label="Edit task"
          >
            <Edit3 size={14} />
          </button>
          <button
            className="task-action-btn delete"
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(task); }}
            aria-label="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
});

export function KanbanTaskCardOverlay({ task }) {
  const statusClass = task?.taskStatus?.toLowerCase();
  if (!task) return null;

  return (
    <div className="kanban-card kanban-card-overlay">
      <h4>{task.name}</h4>
      {task.description && <p>{task.description}</p>}
      <div className="kanban-card-footer">
        <span className={`status-badge ${statusClass}`}>
          {STATUS_LABELS[task.taskStatus] || task.taskStatus}
        </span>
      </div>
    </div>
  );
}

export default KanbanTaskCard;
