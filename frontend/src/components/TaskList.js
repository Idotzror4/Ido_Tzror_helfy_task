import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  if (!tasks.length) {
    return <p>No tasks yet.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;