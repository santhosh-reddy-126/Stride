import {
  createProjectApi,
  getMyProjectsApi,
  getProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from '../api/projectApi';

export async function createProject(projectName, description) {
  const data = { userId: null, projectName, description };
  return createProjectApi(data);
}

export async function fetchMyProjects() {
  const response = await getMyProjectsApi();
  let projects = [];
  if (Array.isArray(response)) {
    projects = response;
  } else if (response && Array.isArray(response.projects)) {
    projects = response.projects;
  }
  return projects.map((p) => ({
    ...p,
    projectId: p.projectId || p.id,
  }));
}

export async function fetchProject(projectId) {
  return getProjectApi(projectId);
}

export async function updateProject(projectId, data) {
  return updateProjectApi(projectId, data);
}

export async function deleteProject(projectId) {
  return deleteProjectApi(projectId);
}
