function Notice({ message, type = 'warning' }) {
  if (!message) return null;

  return (
    <div className={`notice-box notice-${type}`}>
      <span className="notice-icon">⚠️</span>
      <span>{message}</span>
    </div>
  );
}

export default Notice;