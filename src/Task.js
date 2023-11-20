// Task.js
import React from "react";
import "./styles.css";

const Task = ({ task, users }) => {
  const user = users.find((user) => user.id === task.userId);

  return (
    <div className={`task priority-${task.priority}`}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>User: {user ? user.name : "Unknown User"}</p>
    </div>
  );
};

export default Task;
