import { useState, useMemo, useCallback, memo } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';
import KanbanColumn from './KanbanColumn';
import KanbanTaskCard, { KanbanTaskCardOverlay } from './KanbanTaskCard';
import { TASK_STATUS, STATUS_LABELS } from '../../utils/constants';

const columns = [
  { id: TASK_STATUS.CREATED, title: 'Pending', color: '#3b82f6' },
  { id: TASK_STATUS.IN_PROGRESS, title: 'In Progress', color: '#6366f1' },
  { id: TASK_STATUS.COMPLETED, title: 'Completed', color: '#22c55e' },
];

const KanbanBoard = memo(function KanbanBoard({ tasks, onEdit, onDelete, onMoveTask }) {
  const [activeId, setActiveId] = useState(null);
  const [localTasks, setLocalTasks] = useState(null);

  const activeTask = activeId
    ? (localTasks || tasks).find((t) => t.taskId === activeId)
    : null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const columnTasks = useMemo(() => {
    const source = localTasks || tasks;
    const map = {};
    columns.forEach((col) => { map[col.id] = []; });
    source.forEach((task) => {
      if (map[task.taskStatus]) {
        map[task.taskStatus].push(task);
      }
    });
    return map;
  }, [localTasks, tasks]);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
    document.body.classList.add('is-dragging');
  }, []);

  const handleDragEnd = useCallback(
    async (event) => {
      const { active, over } = event;
      document.body.classList.remove('is-dragging');
      setActiveId(null);

      if (!over) return;

      const taskId = Number(active.id);
      const newStatus = String(over.id);
      const validStatuses = Object.values(TASK_STATUS);
      if (!validStatuses.includes(newStatus)) return;

      const task = tasks.find((t) => t.taskId === taskId);
      if (!task || task.taskStatus === newStatus) {
        setLocalTasks(null);
        return;
      }

      const snapshot = tasks;
      setLocalTasks(
        tasks.map((t) =>
          t.taskId === taskId ? { ...t, taskStatus: newStatus } : t
        )
      );

      try {
        await onMoveTask(taskId, newStatus);
        setLocalTasks(null);
        toast.success(`Moved to ${STATUS_LABELS[newStatus] || newStatus}`);
      } catch (err) {
        setLocalTasks(snapshot);
        setTimeout(() => setLocalTasks(null), 0);
        toast.error('Failed to move task');
      }
    },
    [tasks, onMoveTask]
  );

  const handleDragCancel = useCallback(() => {
    document.body.classList.remove('is-dragging');
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="kanban-board">
        {columns.map((col) => {
          const colTasks = columnTasks[col.id] || [];
          return (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              color={col.color}
              count={colTasks.length}
            >
              {colTasks.map((task) => (
                <KanbanTaskCard
                  key={task.taskId}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </KanbanColumn>
          );
        })}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeTask ? <KanbanTaskCardOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
});

export default KanbanBoard;
