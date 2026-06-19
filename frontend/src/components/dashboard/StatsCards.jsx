import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ListTodo, PlayCircle, CheckCircle2 } from 'lucide-react';

const cards = [
  { key: 'total', label: 'Total Tasks', icon: ListTodo, color: 'total' },
  { key: 'inProgress', label: 'In Progress', icon: PlayCircle, color: 'in-progress' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, color: 'completed' },
];

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
      setDisplay(value);
      return;
    }
    hasAnimated.current = true;
    const duration = 800;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span className="stat-value">{display}</span>;
}

export default function StatsCards({ stats }) {
  return (
    <div className="stats-grid">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          className={`stat-card ${card.color}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.07 }}
        >
          <div className="stat-card-info">
            <h3>{card.label}</h3>
            <AnimatedCounter value={stats[card.key] || 0} />
          </div>
          <div className={`stat-card-icon ${card.color}`}>
            <card.icon size={24} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
