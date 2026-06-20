import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Edit3, Trash2 } from 'lucide-react';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants';
import { formatDueDateLabel, isOverdue, isToday } from '../../utils/helpers';

const KanbanTaskCard = memo(function KanbanTaskCard({ task, onEdit, onDelete }) {
  const isCompleted = task.taskStatus === 'COMPLETED';
  const statusClass = task.taskStatus?.toLowerCase();
  const priorityClass = task.taskPriority?.toLowerCase();
  const dueDateArr = task.dueDate;
  const overdue = isOverdue(dueDateArr, task.taskStatus);
  const today = !isCompleted && isToday(dueDateArr);
  const dueLabel = formatDueDateLabel(dueDateArr, task.taskStatus);
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
      className={`kanban-card${overdue ? ' overdue' : ''}${isCompleted ? ' completed' : ''}`}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h4>{task.name}</h4>
      {task.description && <p>{task.description}</p>}
      <div className="kanban-card-meta">
        {task.taskPriority && (
          <span className={`priority-badge ${priorityClass}`}>
            {PRIORITY_LABELS[task.taskPriority] || task.taskPriority}
          </span>
        )}
        {dueLabel && (
          <span className={`due-date${overdue ? ' overdue' : ''}${today ? ' today' : ''}`}>
            {dueLabel}
          </span>
        )}
      </div>
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
  const isCompleted = task?.taskStatus === 'COMPLETED';
  const priorityClass = task?.taskPriority?.toLowerCase();
  const dueDateArr = task?.dueDate;
  const overdue = isOverdue(dueDateArr, task?.taskStatus);
  const today = !isCompleted && isToday(dueDateArr);
  const dueLabel = formatDueDateLabel(dueDateArr, task?.taskStatus);
  if (!task) return null;

  return (
    <div className="kanban-card kanban-card-overlay">
      <h4>{task.name}</h4>
      {task.description && <p>{task.description}</p>}
      <div className="kanban-card-meta">
        {task.taskPriority && (
          <span className={`priority-badge ${priorityClass}`}>
            {PRIORITY_LABELS[task.taskPriority] || task.taskPriority}
          </span>
        )}
        {dueLabel && (
          <span className={`due-date${overdue ? ' overdue' : ''}${today ? ' today' : ''}`}>
            {dueLabel}
          </span>
        )}
      </div>
      <div className="kanban-card-footer">
        <span className={`status-badge ${task.taskStatus?.toLowerCase()}`}>
          {STATUS_LABELS[task.taskStatus] || task.taskStatus}
        </span>
      </div>
    </div>
  );
}

export default KanbanTaskCard;
