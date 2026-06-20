import { createTaskApi, getMyTasksApi, updateTaskApi, deleteTaskApi } from '../api/taskApi';
import { TASK_STATUS } from '../utils/constants';

export async function createTask(name, description, taskStatus, taskPriority, dueDate) {
  return createTaskApi({
    userId: null,
    name,
    description: description || '',
    taskStatus: taskStatus || TASK_STATUS.CREATED,
    taskPriority: taskPriority || null,
    dueDate: dueDate || null,
  });
}

export async function fetchMyTasks(filters = {}) {
  const response = await getMyTasksApi(filters);
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.tasks)) {
    return response.tasks;
  }
  return [];
}

export async function updateTask(taskId, updates) {
  return updateTaskApi(taskId, updates);
}

export async function deleteTask(taskId) {
  return deleteTaskApi(taskId);
}
