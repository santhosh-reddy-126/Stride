import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function ProjectForm({ onSubmit, onCancel, loading, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: initialData?.projectName || initialData?.projectName || '',
      description: initialData?.description || '',
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data.projectName, data.description);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="form-field">
        <label htmlFor="projectName">Project Name *</label>
        <input
          id="projectName"
          type="text"
          placeholder="Enter project name"
          aria-invalid={!!errors.projectName}
          {...register('projectName', { required: 'Project name is required' })}
        />
        {errors.projectName && (
          <span className="field-error" role="alert">{errors.projectName.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="projectDescription">Description</label>
        <textarea
          id="projectDescription"
          placeholder="Enter project description"
          rows={3}
          {...register('description')}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && <Loader2 size={16} />}
          {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </motion.form>
  );
}
