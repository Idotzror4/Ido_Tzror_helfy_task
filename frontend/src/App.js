import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { getTasks, createTask, toggleTask, deleteTask } from './services/tasksApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all'); // all | completed | pending

  async function handleAddTask(taskData) {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      setCurrentIndex(0);
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  }

  async function handleToggleTask(id) {
    try {
      const updated = await toggleTask(id);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task))
      );
    } catch (err) {
      setError(err.message || 'Failed to toggle task');
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setCurrentIndex(0);
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  }

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTasks();
        setTasks(data);
        setCurrentIndex(0);
      } catch (err) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  function showNext() {
    if (filteredTasks.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredTasks.length);
  }

  function showPrev() {
    if (filteredTasks.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredTasks.length) % filteredTasks.length);
  }

  if (loading) {
    return (
      <div className="App">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <p>Error: {error}</p>
      </div>
    );
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const hasTasks = filteredTasks.length > 0;
  const safeIndex = hasTasks ? currentIndex % filteredTasks.length : 0;
  const currentTask = hasTasks ? filteredTasks[safeIndex] : null;

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>
          <p className="subtitle">Create, manage, and track your tasks</p>
        </header>

        <section className="panel">
          <TaskForm onSubmit={handleAddTask} />

          <div className="segmented" role="tablist" aria-label="Task filter">
            <button
              type="button"
              className={`segmented__btn ${filter === 'all' ? 'segmented__btn--active' : ''}`}
              onClick={() => { setFilter('all'); setCurrentIndex(0); }}
            >
              All
            </button>
            <button
              type="button"
              className={`segmented__btn ${filter === 'completed' ? 'segmented__btn--active' : ''}`}
              onClick={() => { setFilter('completed'); setCurrentIndex(0); }}
            >
              Completed
            </button>
            <button
              type="button"
              className={`segmented__btn ${filter === 'pending' ? 'segmented__btn--active' : ''}`}
              onClick={() => { setFilter('pending'); setCurrentIndex(0); }}
            >
              Pending
            </button>
          </div>
        </section>

        <section className="panel">
          {!hasTasks && <p className="empty">No tasks yet.</p>}

          {hasTasks && (
            <>
              <div className="carouselControls">
                <button type="button" className="navBtn" onClick={showPrev}>
                  ‹ Prev
                </button>
                <div className="counter">
                  {safeIndex + 1} / {filteredTasks.length}
                </div>
                <button type="button" className="navBtn" onClick={showNext}>
                  Next ›
                </button>
              </div>

              <div className="carouselCard">
                <TaskItem
                  task={currentTask}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;