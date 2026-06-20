import { API_BASE_URL } from '../utils/constants';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function createTaskApi(taskData) {
  const response = await fetch(`${API_BASE_URL}/task`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to create task');
  }
  return response.json();
}

export async function getMyTasksApi(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.priority) query.append('priority', params.priority);
  if (params.dueStatus) query.append('dueStatus', params.dueStatus);
  const qs = query.toString();
  const url = `${API_BASE_URL}/task/myTasks${qs ? `?${qs}` : ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to fetch tasks');
  }
  return response.json();
}

export async function updateTaskApi(taskId, updates) {
  const response = await fetch(`${API_BASE_URL}/task/${taskId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to update task');
  }
  return response.json();
}

export async function deleteTaskApi(taskId) {
  const response = await fetch(`${API_BASE_URL}/task/${taskId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to delete task');
  }
  return true;
}
