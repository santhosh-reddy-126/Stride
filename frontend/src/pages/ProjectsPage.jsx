import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Edit3, Trash2, FolderKanban, ExternalLink } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { Loader } from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ProjectForm from '../components/projects/ProjectForm';
import { fetchMyProjects, createProject, updateProject, deleteProject } from '../services/projectService';
import { useAuth } from '../hooks/useAuth';

export default function ProjectsPage() {
  const { handleUnauthorized } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMyProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        handleUnauthorized();
        return;
      }
      toast.error(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleCreateProject = useCallback(async (projectName, description) => {
    setCreating(true);
    try {
      await createProject(projectName, description);
      toast.success('Project created successfully');
      setCreateModalOpen(false);
      loadProjects();
    } catch (err) {
      if (err.message === 'Unauthorized') {
        handleUnauthorized();
        return;
      }
      toast.error(err.message || 'Failed to create project');
    } finally {
      setCreating(false);
    }
  }, [handleUnauthorized, loadProjects]);

  const handleEditProject = useCallback(async (projectName, description) => {
    if (!editingProject) return;
    setSaving(true);
    try {
      const updates = {};
      if (projectName !== editingProject.projectName) updates.projectName = projectName;
      if (description !== (editingProject.description || '')) updates.description = description;
      if (Object.keys(updates).length === 0) {
        setEditingProject(null);
        return;
      }
      await updateProject(editingProject.projectId, updates);
      toast.success('Project updated successfully');
      setEditingProject(null);
      loadProjects();
    } catch (err) {
      if (err.message === 'Unauthorized') {
        handleUnauthorized();
        return;
      }
      toast.error(err.message || 'Failed to update project');
    } finally {
      setSaving(false);
    }
  }, [editingProject, handleUnauthorized, loadProjects]);

  const handleDeleteProject = useCallback(async () => {
    if (!deletingProject) return;
    setDeleting(true);
    try {
      await deleteProject(deletingProject.projectId);
      toast.success('Project deleted successfully');
      setDeletingProject(null);
      loadProjects();
    } catch (err) {
      if (err.message === 'Unauthorized') {
        handleUnauthorized();
        return;
      }
      toast.error(err.message || 'Failed to delete project');
    } finally {
      setDeleting(false);
    }
  }, [deletingProject, handleUnauthorized, loadProjects]);

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
              <h1>Projects</h1>
              <p>Manage your projects</p>
            </div>

            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="create-task-btn" onClick={() => setCreateModalOpen(true)}>
                <Plus size={18} />
                New Project
              </button>
            </div>

            {loading ? (
              <Loader />
            ) : projects.length === 0 ? (
              <div className="task-list-section">
                <EmptyState
                  icon={FolderKanban}
                  title="No projects yet"
                  message="Create your first project to organize your tasks"
                  actionLabel="Create Project"
                  onAction={() => setCreateModalOpen(true)}
                />
              </div>
            ) : (
              <div className="task-list-section">
                <div className="task-list-header">
                  <h2>All Projects</h2>
                  <span>{projects.length} total</span>
                </div>
                <div className="task-list">
                  {projects.map((project) => (
                    <div
                      key={project.projectId}
                      className="task-card"
                      onClick={() => navigate(`/projects/${project.projectId}`)}
                    >
                      <div className="task-content">
                        <div className="task-title">{project.projectName}</div>
                        {project.description && (
                          <div className="task-description">{project.description}</div>
                        )}
                      </div>
                      <div className="task-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="task-action-btn"
                          onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.projectId}`); }}
                          aria-label="View project"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button
                          className="task-action-btn"
                          onClick={(e) => { e.stopPropagation(); setEditingProject(project); }}
                          aria-label="Edit project"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className="task-action-btn delete"
                          onClick={(e) => { e.stopPropagation(); setDeletingProject(project); }}
                          aria-label="Delete project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setCreateModalOpen(false)}
          loading={creating}
        />
      </Modal>

      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title="Edit Project"
      >
        {editingProject && (
          <ProjectForm
            onSubmit={handleEditProject}
            onCancel={() => setEditingProject(null)}
            loading={saving}
            initialData={editingProject}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${deletingProject?.projectName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}
