import { useEffect, useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const isCompleted = task.completed;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'medium');

  useEffect(() => {
    setTitle(task.title || '');
    setDescription(task.description || '');
    setPriority(task.priority || 'medium');
    setIsEditing(false);
  }, [task.id]);

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

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelClick() {
    setTitle(task.title || '');
    setDescription(task.description || '');
    setPriority(task.priority || 'medium');
    setIsEditing(false);
  }

  function handleSaveClick() {
    if (typeof onUpdate !== 'function') return;
    if (!title.trim()) return;

    onUpdate(task.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: task.completed,
    });

    setIsEditing(false);
  }

  return (
    <div className="task-card">
      <div className="task-card__title">
        {!isEditing && <strong>{task.title}</strong>}
        {isEditing && (
          <input
            className="task-edit__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        )}
      </div>
      <div className="task-card__meta">
        {!isEditing && <span>{task.description || 'No description'}</span>}
        {isEditing && (
          <input
            className="task-edit__input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        )}

        {!isEditing && (
          <span className={`priority-${task.priority}`}>Priority: {task.priority}</span>
        )}

        {isEditing && (
          <label className="task-edit__row">
            <span className="task-edit__label">Priority</span>
            <select
              className="task-edit__select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </label>
        )}

        <span>Status: {isCompleted ? 'Done' : 'Pending'}</span>
      </div>
      <div className="task-card__actions">
        {!isEditing && (
          <>
            <button onClick={handleToggleClick}>
              {isCompleted ? 'Mark as pending' : 'Mark as done'}
            </button>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </>
        )}

        {isEditing && (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;