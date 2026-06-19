export function Loader() {
  return (
    <div className="loader-container" role="status" aria-label="Loading">
      <div className="loader" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-line skeleton" style={{ width: '70%' }} />
      <div className="skeleton-line skeleton" style={{ width: '90%' }} />
      <div className="skeleton-line skeleton" style={{ width: '40%' }} />
    </div>
  );
}

export function SkeletonList({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
