import { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';

const KanbanColumn = memo(function KanbanColumn({ id, title, color, count, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <h3>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: color,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          {title}
        </h3>
        <span className="count">{count}</span>
      </div>
      <div
        ref={setNodeRef}
        className={`kanban-droppable ${isOver ? 'dragging-over' : ''}`}
      >
        {children}
      </div>
    </div>
  );
});

export default KanbanColumn;
