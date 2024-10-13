import React from 'react';
import './content.css'

const Content = () => {
  return (
    <div className="content">
      <h1>To-Do List Dashboard</h1>
      <p>Manage your tasks effectively by adding, updating, or marking them as completed.</p>
      <ul>
        <li>Add new tasks to stay organized</li>
        <li>View and manage your current tasks</li>
        <li>Mark tasks as completed when you're done</li>
      </ul>
    </div>
  );
};

export default Content;
