import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No items found',
  message = 'There are no items to display.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <Icon size={80} strokeWidth={1} />
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
