function Notice({ type, message }) {
  if (!message) return null;

  return (
    <div className={`notice notice-${type}`}>
      <span className="notice-icon">{type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span>{message}</span>
    </div>
  );
}

export default Notice;