import { createTaskApi, getMyTasksApi, updateTaskApi, deleteTaskApi } from '../api/taskApi';
import { TASK_STATUS } from '../utils/constants';

export async function createTask(name, description, taskStatus) {
  return createTaskApi({
    userId: null,
    name,
    description: description || '',
    taskStatus: taskStatus || TASK_STATUS.CREATED,
  });
}

export async function fetchMyTasks() {
  const response = await getMyTasksApi();
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
