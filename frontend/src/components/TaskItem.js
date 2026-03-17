function TaskItem({ task, onToggle, onDelete }) {
    console.log('TaskItem props:', { task, onToggle, onDelete });
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
      <li>
        <strong>{task.title}</strong> – {task.description || 'No description'}
        {' | '}
        Priority: {task.priority}
        {' | '}
        Status: {isCompleted ? 'Done' : 'Pending'}
        {' '}
        <button onClick={handleToggleClick}>
          {isCompleted ? 'Mark as pending' : 'Mark as done'}
        </button>
        <button onClick={handleDeleteClick}>
          Delete
        </button>
      </li>
    );
  }
  
  export default TaskItem;