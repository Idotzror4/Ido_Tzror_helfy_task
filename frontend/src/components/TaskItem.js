function TaskItem({ task, onToggle, onDelete }) {
  const isCompleted = task.completed;

  function handleToggleClick() {
    if (typeof onToggle === 'function') {
      onToggle(task.id);
    }
  }

  function handleDeleteClick() {
    if (typeof onDelete === 'function') {
      onDelete(task.id);
    }
  }

  return (
    <div className="task-card">
      <div className="task-card__title">
        <strong>{task.title}</strong>
      </div>
      <div className="task-card__meta">
        <span>{task.description || 'No description'}</span>
        <span className={`priority-${task.priority}`}>Priority: {task.priority}</span>
        <span>Status: {isCompleted ? 'Done' : 'Pending'}</span>
      </div>
      <div className="task-card__actions">
        <button onClick={handleToggleClick}>
          {isCompleted ? 'Mark as pending' : 'Mark as done'}
        </button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;