import { API_BASE_URL } from '../utils/constants';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function createProjectApi(data) {
  const response = await fetch(`${API_BASE_URL}/project`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to create project');
  }
  return response.json();
}

export async function getMyProjectsApi() {
  const response = await fetch(`${API_BASE_URL}/project/myProjects`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to fetch projects');
  }
  return response.json();
}

export async function getProjectApi(projectId) {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to fetch project');
  }
  return response.json();
}

export async function updateProjectApi(projectId, data) {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to update project');
  }
  return response.json();
}

export async function deleteProjectApi(projectId) {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    const error = await response.text();
    throw new Error(error || 'Failed to delete project');
  }
  return response.json();
}
