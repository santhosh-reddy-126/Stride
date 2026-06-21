import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, FolderKanban, Edit3, Plus, LayoutList, Columns } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import StatsCards from '../components/dashboard/StatsCards';
import TaskList from '../components/dashboard/TaskList';
import KanbanBoard from '../components/dashboard/KanbanBoard';
import CreateTaskForm from '../components/dashboard/CreateTaskForm';
import EditTaskForm from '../components/dashboard/EditTaskForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { Loader } from '../components/common/Loader';
import ProjectForm from '../components/projects/ProjectForm';
import { fetchProject, updateProject } from '../services/projectService';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';

export default function ProjectDetailsPage() {
  const { handleUnauthorized } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const pid = Number(projectId);

  const { tasks, loading, addTask, editTask, removeTask, moveTask, getFilteredTasks, stats, changeFilters } =
    useTasks(handleUnauthorized, true);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskSaving, setTaskSaving] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [search, setSearch] = useState('');

  useEffect(() => {
    changeFilters({ projectId: pid });
  }, [pid, changeFilters]);

  const projectsForBadge = useMemo(
    () => (project ? [{ ...project, projectId: project.projectId || project.id }] : []),
    [project]
  );

  const loadProject = useCallback(async () => {
    setProjectLoading(true);
    try {
      const data = await fetchProject(projectId);
      setProject(data);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        handleUnauthorized();
        return;
      }
      toast.error(err.message || 'Failed to load project');
    } finally {
      setProjectLoading(false);
    }
  }, [projectId, handleUnauthorized]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const handleEditProject = useCallback(async (projectName, description) => {
    if (!project) return;
    setSaving(true);
    try {
      const updates = {};
      if (projectName !== project.projectName) updates.projectName = projectName;
      if (description !== (project.description || '')) updates.description = description;
      if (Object.keys(updates).length > 0) {
        const updated = await updateProject(project.projectId, updates);
        setProject(updated);
        toast.success('Project updated successfully');
      }
      setEditModalOpen(false);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        handleUnauthorized();
        return;
      }
      toast.error(err.message || 'Failed to update project');
    } finally {
      setSaving(false);
    }
  }, [project, handleUnauthorized]);

  const handleCreateTask = useCallback(
    async (name, description, taskStatus, taskPriority, dueDate) => {
      setCreating(true);
      try {
        await addTask(name, description, taskStatus, taskPriority, dueDate, pid);
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
    [addTask, handleUnauthorized, pid]
  );

  const handleEditTask = useCallback(
    async (updates) => {
      if (!editingTask) return;
      setTaskSaving(true);
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
        setTaskSaving(false);
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

  const filteredTasks = getFilteredTasks(search);
  const pageLoading = projectLoading || loading;

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
            <button
              onClick={() => navigate('/projects')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20,
                padding: '8px 0', cursor: 'pointer', background: 'none', border: 'none',
              }}
            >
              <ArrowLeft size={18} />
              Back to Projects
            </button>

            {projectLoading ? (
              <Loader />
            ) : !project ? (
              <div className="task-list-section" style={{ padding: 48, textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Project not found</p>
              </div>
            ) : (
              <>
                <div className="task-list-section" style={{ padding: 32, marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: 'var(--radius)',
                        background: 'var(--accent-bg)', color: 'var(--accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <FolderKanban size={28} />
                      </div>
                      <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                          {project.projectName}
                        </h1>
                        {project.description && (
                          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 600 }}>
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditModalOpen(true)}
                      style={{ flexShrink: 0 }}
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                  </div>
                </div>

                <StatsCards stats={stats} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                  <div className="search-wrapper" style={{ flex: 1, maxWidth: 400 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ width: '100%', padding: '10px 16px 10px 42px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}
                      aria-label="Search tasks"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="view-toggle">
                      <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} aria-label="List view">
                        <LayoutList size={16} />
                        List
                      </button>
                      <button className={viewMode === 'kanban' ? 'active' : ''} onClick={() => setViewMode('kanban')} aria-label="Kanban view">
                        <Columns size={16} />
                        Board
                      </button>
                    </div>
                    <button className="create-task-btn" onClick={() => setCreateModalOpen(true)}>
                      <Plus size={18} />
                      New Task
                    </button>
                  </div>
                </div>

                {viewMode === 'list' ? (
                  <TaskList
                    tasks={filteredTasks}
                    loading={pageLoading}
                    search={search}
                    onEdit={setEditingTask}
                    onDelete={setDeletingTask}
                    projects={projectsForBadge}
                  />
                ) : (
                  <KanbanBoard
                    tasks={filteredTasks}
                    onEdit={setEditingTask}
                    onDelete={setDeletingTask}
                    onMoveTask={moveTask}
                    projects={projectsForBadge}
                  />
                )}
              </>
            )}
          </motion.div>
        </main>
      </div>

      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Task">
        <CreateTaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setCreateModalOpen(false)}
          loading={creating}
        />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
        {editingTask && (
          <EditTaskForm
            task={editingTask}
            onSubmit={handleEditTask}
            onCancel={() => setEditingTask(null)}
            loading={taskSaving}
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

      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Project">
        {project && (
          <ProjectForm
            onSubmit={handleEditProject}
            onCancel={() => setEditModalOpen(false)}
            loading={saving}
            initialData={project}
          />
        )}
      </Modal>
    </div>
  );
}
