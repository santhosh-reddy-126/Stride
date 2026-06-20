import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, LayoutList, Columns } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import StatsCards from '../components/dashboard/StatsCards';
import TaskFilters from '../components/dashboard/TaskFilters';
import TaskList from '../components/dashboard/TaskList';
import KanbanBoard from '../components/dashboard/KanbanBoard';
import CreateTaskForm from '../components/dashboard/CreateTaskForm';
import EditTaskForm from '../components/dashboard/EditTaskForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { handleUnauthorized } = useAuth();
  const { tasks, loading, addTask, editTask, removeTask, moveTask, getFilteredTasks, stats, changeFilters } =
    useTasks(handleUnauthorized);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [dueStatusFilter, setDueStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('list');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const params = {};
    if (statusFilter !== 'ALL') params.status = statusFilter;
    if (priorityFilter !== 'ALL') params.priority = priorityFilter;
    if (dueStatusFilter !== 'ALL') params.dueStatus = dueStatusFilter;
    changeFilters(params);
  }, [statusFilter, priorityFilter, dueStatusFilter, changeFilters]);

  const filteredTasks = getFilteredTasks(search);

  const handleCreateTask = useCallback(
    async (name, description, taskStatus, taskPriority, dueDate) => {
      setCreating(true);
      try {
        await addTask(name, description, taskStatus, taskPriority, dueDate);
        toast.success('Task created successfully');
        setCreateModalOpen(false);
      } catch (err) {
        if (err.message === 'Unauthorized') {
          handleUnauthorized();
          return;
        }
        toast.error(err.message || 'Failed to create task');
      } finally {
        setCreating(false);
      }
    },
    [addTask, handleUnauthorized]
  );

  const handleEditTask = useCallback(
    async (updates) => {
      if (!editingTask) return;
      setSaving(true);
      try {
        await editTask(editingTask.taskId, updates);
        toast.success('Task updated successfully');
        setEditingTask(null);
      } catch (err) {
        if (err.message === 'Unauthorized') {
          handleUnauthorized();
          return;
        }
        toast.error(err.message || 'Failed to update task');
      } finally {
        setSaving(false);
      }
    },
    [editingTask, editTask, handleUnauthorized]
  );

  const handleDeleteTask = useCallback(
    async () => {
      if (!deletingTask) return;
      setDeleting(true);
      try {
        await removeTask(deletingTask.taskId);
        toast.success('Task deleted successfully');
        setDeletingTask(null);
      } catch (err) {
        if (err.message === 'Unauthorized') {
          handleUnauthorized();
          return;
        }
        toast.error(err.message || 'Failed to delete task');
      } finally {
        setDeleting(false);
      }
    },
    [deletingTask, removeTask, handleUnauthorized]
  );

  return (
    <div className="dashboard-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`dashboard-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="dashboard-content">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="page-header">
              <h1>Dashboard</h1>
              <p>Overview of your task management</p>
            </div>

            <StatsCards stats={stats} />

            <TaskFilters
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              dueStatusFilter={dueStatusFilter}
              onDueStatusFilterChange={setDueStatusFilter}
            >
              <div className="view-toggle">
                <button
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <LayoutList size={16} />
                  List
                </button>
                <button
                  className={viewMode === 'kanban' ? 'active' : ''}
                  onClick={() => setViewMode('kanban')}
                  aria-label="Kanban view"
                >
                  <Columns size={16} />
                  Board
                </button>
              </div>
              <button className="create-task-btn" onClick={() => setCreateModalOpen(true)}>
                <Plus size={18} />
                New Task
              </button>
            </TaskFilters>

            {viewMode === 'list' ? (
              <TaskList
                tasks={filteredTasks}
                loading={loading}
                search={search}
                onEdit={setEditingTask}
                onDelete={setDeletingTask}
              />
            ) : (
              <KanbanBoard
                tasks={filteredTasks}
                onEdit={setEditingTask}
                onDelete={setDeletingTask}
                onMoveTask={moveTask}
              />
            )}
          </motion.div>
        </main>
      </div>

      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Task"
      >
        <CreateTaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setCreateModalOpen(false)}
          loading={creating}
        />
      </Modal>

      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        {editingTask && (
          <EditTaskForm
            task={editingTask}
            onSubmit={handleEditTask}
            onCancel={() => setEditingTask(null)}
            loading={saving}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete "${deletingTask?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}
