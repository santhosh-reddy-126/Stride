import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import EmptyState from '../common/EmptyState';
import { SkeletonList } from '../common/Loader';
import { Inbox } from 'lucide-react';

export default function TaskList({ tasks, loading, search, onEdit, onDelete, projects = [] }) {
  if (loading) {
    return (
      <div className="task-list-section">
        <div className="task-list-header">
          <h2>Tasks</h2>
        </div>
        <div className="task-list">
          <SkeletonList count={5} />
        </div>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="task-list-section">
        <div className="task-list-header">
          <h2>Tasks</h2>
        </div>
        <EmptyState
          icon={Inbox}
          title={search ? 'No matching tasks' : 'No tasks yet'}
          message={
            search
              ? 'Try a different search or filter'
              : 'Create your first task to get started'
          }
        />
      </div>
    );
  }

  return (
    <div className="task-list-section">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <span>{tasks.length} total</span>
      </div>
      <div className="task-list">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard
              key={task.taskId}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              projects={projects}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
