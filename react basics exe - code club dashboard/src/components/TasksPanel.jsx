function TasksPanel({ selectedMember, tasks, onToggleTask }) {
  if (!selectedMember) {
    return <div className="tasks-panel empty">Select a member to view tasks</div>;
  }

  return (
    <div className="tasks-panel">
      <h2>Tasks for {selectedMember.name}</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet for this member.</p>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onToggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksPanel;