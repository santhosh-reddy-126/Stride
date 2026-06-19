import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import EmptyState from '../common/EmptyState';
import { SkeletonList } from '../common/Loader';
import { Inbox } from 'lucide-react';

export default function TaskList({ tasks, loading, search, statusFilter, onEdit, onDelete }) {
  const filtered = useMemo(
    () => {
      return tasks.filter((task) => {
        const matchesSearch =
          !search ||
          task.name?.toLowerCase().includes(search.toLowerCase()) ||
          task.description?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          !statusFilter || statusFilter === 'ALL' || task.taskStatus === statusFilter;
        return matchesSearch && matchesStatus;
      });
    },
    [tasks, search, statusFilter]
  );

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

  if (!filtered.length) {
    return (
      <div className="task-list-section">
        <div className="task-list-header">
          <h2>Tasks</h2>
          <span>{tasks.length} total</span>
        </div>
        <EmptyState
          icon={Inbox}
          title={search || (statusFilter && statusFilter !== 'ALL') ? 'No matching tasks' : 'No tasks yet'}
          message={
            search || (statusFilter && statusFilter !== 'ALL')
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
        <span>{filtered.length} of {tasks.length}</span>
      </div>
      <div className="task-list">
        <AnimatePresence mode="popLayout">
          {filtered.map((task) => (
            <TaskCard
              key={task.taskId}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
