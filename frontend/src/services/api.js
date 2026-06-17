// API Configuration
const API_BASE_URL = 'http://localhost:8080'

// Get token from localStorage
const getToken = () => localStorage.getItem('token')

// API Service for Auth
export const authService = {
  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    if (!response.ok) throw new Error('Signup failed')
    return await response.json()
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    if (!response.ok) throw new Error('Login failed')
    return await response.json()
  }
}

// API Service for Tasks
export const taskService = {
  createTask: async (name, description, taskStatus) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: null,
        name,
        description,
        taskStatus
      })
    })
    if (!response.ok) throw new Error('Failed to create task')
    return await response.json()
  },

  getMyTasks: async () => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/task/myTasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) throw new Error('Failed to get my tasks')
    return await response.json()
  }
}

// API Service for Health Check
export const healthService = {
  checkHealth: async () => {
    const response = await fetch(`${API_BASE_URL}/hello`, {
      method: 'GET'
    })
    if (!response.ok) throw new Error('Backend is unavailable')
    return await response.text()
  }
}
