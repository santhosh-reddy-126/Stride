import { loginApi, signupApi } from '../api/authApi';

export async function loginUser(email, password) {
  const data = await loginApi(email, password);
  localStorage.setItem('token', data.token);
  localStorage.setItem('userName', data.name);
  localStorage.setItem('userEmail', data.email);
  return data;
}

export async function signupUser(name, email, password) {
  return signupApi(name, email, password);
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
}

export function getStoredUser() {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  if (!token) return null;
  return { token, name, email };
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
