import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, toggleTask, deleteTask } from './services/tasksApi';
import TaskItem from './components/TaskItem';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleAddTask(taskData) {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
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
      } catch (err) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (loading) {
    return <div className="App"><p>Loading tasks...</p></div>;
  }

  if (error) {
    return <div className="App"><p>Error: {error}</p></div>;
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onSubmit={handleAddTask} />
  
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;