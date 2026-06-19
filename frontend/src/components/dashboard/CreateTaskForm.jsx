import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { STATUS_OPTIONS, TASK_STATUS } from '../../utils/constants';

export default function CreateTaskForm({ onSubmit, onCancel, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { taskStatus: TASK_STATUS.CREATED },
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data.name, data.description, data.taskStatus);
    reset();
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="form-field">
        <label htmlFor="taskTitle">Task Title *</label>
        <input
          id="taskTitle"
          type="text"
          placeholder="Enter task title"
          aria-invalid={!!errors.name}
          {...register('name', { required: 'Task title is required' })}
        />
        {errors.name && (
          <span className="field-error" role="alert">{errors.name.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="taskDescription">Description</label>
        <textarea
          id="taskDescription"
          placeholder="Enter task description (optional)"
          rows={3}
          {...register('description')}
        />
      </div>

      <div className="form-field">
        <label htmlFor="taskStatus">Status *</label>
        <select
          id="taskStatus"
          aria-invalid={!!errors.taskStatus}
          {...register('taskStatus', { required: 'Status is required' })}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.taskStatus && (
          <span className="field-error" role="alert">{errors.taskStatus.message}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && <Loader2 size={16} />}
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </motion.form>
  );
}
