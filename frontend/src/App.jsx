import { useMemo, useState, useEffect } from 'react'
import { authService, taskService } from './services/api'

// Status mapping from backend enum to UI display names
const statusMap = {
  CREATED: 'Pending',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  DELETED: 'Deleted'
}

const statusOptions = ['All', 'Pending', 'In progress', 'Completed']

function App() {
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskStatus, setTaskStatus] = useState('CREATED')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // 1. Restore user session from localStorage on application mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])
  

  // 2. Fetch tasks ONLY when a user is logged in / authenticated
  useEffect(() => {
    // Guard clause: If there is no active user, do not hit the tasks API
    if (!user) return

    const fetchTasks = async () => {
      setError('')
      setLoading(true)
      try {
        const response = await taskService.getMyTasks()
        setTasks(response?.tasks || response || []) // Fallback array parser
      } catch (err) {
        console.log(err)
        setError('Could not load tasks. Please refresh.')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [user]) // Triggers immediately post-login or when session restores


  const filteredTasks = useMemo(() => {
    if (!Array.isArray(tasks)) return []
    if (selectedStatus === 'All') return tasks
    return tasks.filter((task) => statusMap[task.taskStatus] === selectedStatus)
  }, [selectedStatus, tasks])

  const stats = useMemo(() => {
    if (!Array.isArray(tasks)) return { total: 0, pending: 0, inProgress: 0, completed: 0 }
    return {
      total: tasks.length,
      pending: tasks.filter((task) => task.taskStatus === 'CREATED').length,
      inProgress: tasks.filter((task) => task.taskStatus === 'IN_PROGRESS').length,
      completed: tasks.filter((task) => task.taskStatus === 'COMPLETED').length
    }
  }, [tasks])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email.trim() || !password.trim()) {
        setError('Please enter your email and password')
        setLoading(false)
        return
      }
      const response = await authService.login(email.trim(), password.trim())
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify({ name: response.name, email: response.email }))
      
      // Setting user state here automatically kicks off the fetchTasks useEffect above
      setUser({ name: response.name, email: response.email })
      setEmail('')
      setPassword('')
      setTasks([])
    } catch (err) {
      console.log(err)
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }
      
      const response = await authService.signup(name.trim(), email.trim(), password.trim())
      
      if (response === true || response === 'true') {
        setName('')
        setPassword('')
        setAuthMode('login')
        setError('Account created successfully! Please sign in.') 
      } else {
        throw new Error('Unexpected backend response structure')
      }

    } catch (err) {
      console.error(err)
      setError('Could not create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!taskTitle.trim()) {
        setError('Please enter a task title')
        setLoading(false)
        return
      }
      const response = await taskService.createTask(taskTitle.trim(), taskDesc.trim(), taskStatus)
      setTasks((prev) => [...prev, response])
      setTaskTitle('')
      setTaskDesc('')
      setTaskStatus('CREATED')
    } catch (err) {
      setError('Could not save task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null) // Clears user view and resets state tracking
    setEmail('')
    setPassword('')
    setName('')
    setTasks([])
    setError('')
  }

  // Auth Screen
  if (!user) {
    return (
      <div className="auth-shell">
        <aside className="auth-promo">
          <div>
            <p className="eyebrow light">Task Manager</p>
            <h1>Manage work with clarity.</h1>
            <p className="lead-text light">
              A premium task workspace designed for teams who want focus, speed, and a sleek experience.
            </p>
          </div>
          <div className="promo-highlights">
            <div>
              <strong>Professional layout</strong>
              <p>Clean workflow cards and intuitive app structure.</p>
            </div>
            <div>
              <strong>Always available</strong>
              <p>Access your tasks anytime, anywhere, seamlessly.</p>
            </div>
          </div>
        </aside>

        <main className="auth-form-panel">
          <div className="auth-card-wrapper">
            <div className="auth-topbar">
              <span>{authMode === 'login' ? 'Welcome back' : 'Join the workspace'}</span>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login')
                  setError('')
                }}
              >
                {authMode === 'login' ? 'Create account' : 'Sign in'}
              </button>
            </div>

            <div className="auth-card">
              <h2>{authMode === 'login' ? 'Sign in to continue' : 'Create your account'}</h2>
              <p className="auth-subtitle">Manage your tasks efficiently</p>
              {error && <div className="error-box">{error}</div>}
              <form onSubmit={authMode === 'login' ? handleLogin : handleSignup}>
                {authMode === 'signup' && (
                  <label className="field-label">
                    Full name
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="input"
                      disabled={loading}
                    />
                  </label>
                )}
                <label className="field-label">
                  Email address
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="input"
                    disabled={loading}
                  />
                </label>
                <label className="field-label">
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input"
                    disabled={loading}
                  />
                </label>
                <button type="submit" className="primary-button large-button" disabled={loading}>
                  {loading ? 'Processing...' : authMode === 'login' ? 'Sign in' : 'Create account'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Dashboard Screen
  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Task Manager</p>
          <h1>Welcome back, {user.name}</h1>
        </div>
        <div className="avatar-panel">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <p className="avatar-name">{user.name}</p>
            <button type="button" className="text-button" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="eyebrow">Total tasks</p>
          <h2>{stats.total}</h2>
          <p className="stat-note">All active items in the workspace.</p>
        </article>
        <article className="stat-card">
          <p className="eyebrow">In progress</p>
          <h2>{stats.inProgress}</h2>
          <p className="stat-note">Tasks currently in motion.</p>
        </article>
        <article className="stat-card">
          <p className="eyebrow">Pending</p>
          <h2>{stats.pending}</h2>
          <p className="stat-note">Waiting to be started.</p>
        </article>
        <article className="stat-card completed-card">
          <p className="eyebrow">Completed</p>
          <h2>{stats.completed}</h2>
          <p className="stat-note">Finished work and delivered value.</p>
        </article>
      </section>

      <main className="main-grid">
        <article className="panel task-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Tasks</p>
              <h2>Current tasks</h2>
            </div>
            <div className="filter-row">
              <span>Filter:</span>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="select">
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <p className="empty-state">No tasks found. Create one to get started!</p>
            ) : (
              filteredTasks.map((task) => (
                <article key={task.taskId || Math.random()} className="task-card">
                  <div>
                    <h3>{task.name}</h3>
                    <p>{task.description || 'No description'}</p>
                  </div>
                  <span className={`status-pill status-${(statusMap[task.taskStatus] || 'Pending').replace(/\s+/g, '-').toLowerCase()}`}>
                    {statusMap[task.taskStatus] || 'Pending'}
                  </span>
                </article>
              ))
            )}
          </div>
        </article>

        <aside className="panel side-panel">
          <div className="section-header">
            <p className="eyebrow">Quick add</p>
            <h2>New task</h2>
          </div>
          {error && <div className="error-box">{error}</div>}
          <form onSubmit={handleAddTask} className="task-form">
            <label className="field-label">
              Title
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task title"
                className="input"
                disabled={loading}
              />
            </label>
            <label className="field-label">
              Description
              <textarea
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                placeholder="Add a short description"
                className="textarea"
                disabled={loading}
              />
            </label>
            <label className="field-label">
              Status
              <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} className="select" disabled={loading}>
                <option value="CREATED">Pending</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </label>
            <button type="submit" className="primary-button large-button" disabled={loading}>
              {loading ? 'Adding task...' : 'Add task'}
            </button>
          </form>
        </aside>
      </main>
    </div>
  )
}

export default App