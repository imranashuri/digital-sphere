import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Filtered Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;