import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';
import { arrayToDatetimeLocalValue, datetimeLocalToArray } from '../../utils/helpers';

export default function EditTaskForm({ task, onSubmit, onCancel, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: task.name || '',
      description: task.description || '',
      taskStatus: task.taskStatus || '',
      taskPriority: task.taskPriority || '',
      dueDate: arrayToDatetimeLocalValue(task.dueDate),
    },
  });

  const handleFormSubmit = (data) => {
    const updates = {};
    if (data.name !== task.name) updates.name = data.name;
    if (data.description !== (task.description || '')) {
      updates.description = data.description;
    }
    if (data.taskStatus !== task.taskStatus) updates.taskStatus = data.taskStatus;
    if ((data.taskPriority || null) !== (task.taskPriority || null)) {
      updates.taskPriority = data.taskPriority || null;
    }
    const newDueDate = datetimeLocalToArray(data.dueDate);
    const oldDueDate = Array.isArray(task.dueDate) ? task.dueDate : null;
    if (JSON.stringify(newDueDate) !== JSON.stringify(oldDueDate)) {
      updates.dueDate = newDueDate;
    }
    onSubmit(updates);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="form-field">
        <label htmlFor="editTaskTitle">Task Title</label>
        <input
          id="editTaskTitle"
          type="text"
          placeholder="Enter task title"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <span className="field-error" role="alert">{errors.name.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="editTaskDescription">Description</label>
        <textarea
          id="editTaskDescription"
          placeholder="Enter task description"
          rows={3}
          {...register('description')}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="editTaskPriority">Priority</label>
          <select id="editTaskPriority" {...register('taskPriority')}>
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="editTaskDueDate">Due Date & Time</label>
          <input
            id="editTaskDueDate"
            type="datetime-local"
            {...register('dueDate')}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="editTaskStatus">Status</label>
        <select id="editTaskStatus" {...register('taskStatus')}>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && <Loader2 size={16} />}
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </motion.form>
  );
}
