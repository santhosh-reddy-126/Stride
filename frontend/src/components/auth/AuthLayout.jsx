import { ClipboardCheck, BarChart3, Kanban, ShieldCheck } from 'lucide-react';

const features = [
  { icon: ClipboardCheck, title: 'Task Management', desc: 'Organize and track tasks effortlessly' },
  { icon: Kanban, title: 'Kanban Board', desc: 'Visualize workflow with drag & drop' },
  { icon: BarChart3, title: 'Analytics', desc: 'Track productivity with charts' },
  { icon: ShieldCheck, title: 'Secure', desc: 'Enterprise-grade authentication' },
];

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <div className="logo-icon">
            <ClipboardCheck size={32} />
          </div>
          <h1>Task Manager Pro</h1>
          <p>Streamline your workflow, boost productivity, and never miss a deadline.</p>
          <div className="feature-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-item">
                <f.icon size={20} />
                <div className="feature-item-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
