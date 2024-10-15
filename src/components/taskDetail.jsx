// src/components/TaskDetail.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const TaskDetail = () => {
  const { state } = useLocation();
  const { task } = state || {};

  if (!task) {
    return <div>No task found.</div>;
  }

  return (
    <div>
      <h1>Task Details</h1>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.due_date}</p>
      <p>Completion Date: {task.done_at || 'Not completed'}</p>
    </div>
  );
};

export default TaskDetail;
