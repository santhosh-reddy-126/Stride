import { useMemo, useState } from 'react'

const initialTasks = [
  {
    id: 1,
    title: 'Design the customer journey',
    description: 'Map the main flows and validate the new onboarding steps.',
    status: 'In progress',
    due: 'Today'
  },
  {
    id: 2,
    title: 'Finalize sprint backlog',
    description: 'Review priorities and confirm the delivery plan with the team.',
    status: 'Pending',
    due: 'Tomorrow'
  },
  {
    id: 3,
    title: 'QA review',
    description: 'Complete regression checks for the latest release candidate.',
    status: 'Completed',
    due: 'Yesterday'
  }
]

const statusOptions = ['All', 'Pending', 'In progress', 'Completed']

function App() {
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [tasks, setTasks] = useState(initialTasks)
  const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'Pending' })
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [activeTab, setActiveTab] = useState('Overview')

  const filteredTasks = useMemo(() => {
    if (selectedStatus === 'All') return tasks
    return tasks.filter((task) => task.status === selectedStatus)
  }, [selectedStatus, tasks])

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((task) => task.status === 'Pending').length,
      inProgress: tasks.filter((task) => task.status === 'In progress').length,
      completed: tasks.filter((task) => task.status === 'Completed').length
    }
  }, [tasks])

  const handleAuthChange = (event) => {
    const { name, value } = event.target
    setAuthForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()
    if (!authForm.email.trim() || !authForm.password.trim()) return
    setUser({ name: authForm.name || 'Project Lead', email: authForm.email.trim() })
  }

  const handleTaskChange = (event) => {
    const { name, value } = event.target
    setTaskForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTaskSubmit = (event) => {
    event.preventDefault()
    if (!taskForm.title.trim()) return
    setTasks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: taskForm.title.trim(),
        description: taskForm.description.trim(),
        status: taskForm.status,
        due: 'Next week'
      }
    ])
    setTaskForm({ title: '', description: '', status: 'Pending' })
  }

  const handleLogout = () => {
    setUser(null)
    setAuthForm({ name: '', email: '', password: '' })
  }

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
              <strong>Fast startup</strong>
              <p>Ready to connect to your backend whenever you want.</p>
            </div>
          </div>
        </aside>

        <main className="auth-form-panel">
          <div className="auth-topbar">
            <span>{authMode === 'login' ? 'Welcome back' : 'Join the workspace'}</span>
            <button
              type="button"
              className="text-button"
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            >
              {authMode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </div>

          <div className="auth-card">
            <h2>{authMode === 'login' ? 'Sign in to continue' : 'Create your account'}</h2>
            <p className="auth-subtitle">This is a frontend mock UI with local auth state only.</p>
            <form onSubmit={handleAuthSubmit} className="auth-form">
              {authMode === 'signup' && (
                <label className="field-label">
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={authForm.name}
                    onChange={handleAuthChange}
                    placeholder="Jane Doe"
                    className="input"
                  />
                </label>
              )}
              <label className="field-label">
                Email address
                <input
                  type="email"
                  name="email"
                  value={authForm.email}
                  onChange={handleAuthChange}
                  placeholder="email@example.com"
                  className="input"
                />
              </label>
              <label className="field-label">
                Password
                <input
                  type="password"
                  name="password"
                  value={authForm.password}
                  onChange={handleAuthChange}
                  placeholder="Enter your password"
                  className="input"
                />
              </label>
              <button type="submit" className="primary-button large-button">
                {authMode === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </form>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Task Manager</p>
          <h1>Welcome back, {user.name}</h1>
        </div>
        <div className="avatar-panel">
          <div className="avatar">{user.name.slice(0, 1).toUpperCase()}</div>
          <div>
            <p className="avatar-name">{user.name}</p>
            <button type="button" className="text-button" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        {['Overview', 'Task Board', 'Reports'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

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
              <p className="eyebrow">Task board</p>
              <h2>{activeTab === 'Reports' ? 'Insights' : 'Current tasks'}</h2>
            </div>
            <div className="filter-row">
              <span>Filter:</span>
              <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} className="select">
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <p className="empty-state">No tasks found for this filter.</p>
            ) : (
              filteredTasks.map((task) => (
                <article key={task.id} className="task-card modern-card">
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className="due-label">Due {task.due}</span>
                  </div>
                  <span className={`status-pill status-${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {task.status}
                  </span>
                </article>
              ))
            )}
          </div>
        </article>

        <aside className="panel side-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Quick add</p>
              <h2>New task</h2>
            </div>
          </div>
          <form onSubmit={handleTaskSubmit} className="task-form">
            <label className="field-label">
              Title
              <input
                type="text"
                name="title"
                value={taskForm.title}
                onChange={handleTaskChange}
                placeholder="Task title"
                className="input"
              />
            </label>
            <label className="field-label">
              Description
              <textarea
                name="description"
                value={taskForm.description}
                onChange={handleTaskChange}
                placeholder="Add a short description"
                className="textarea"
              />
            </label>
            <label className="field-label">
              Status
              <select name="status" value={taskForm.status} onChange={handleTaskChange} className="select">
                {statusOptions.slice(1).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="primary-button large-button">
              Add task
            </button>
          </form>
        </aside>
      </main>
    </div>
  )
}

export default App
