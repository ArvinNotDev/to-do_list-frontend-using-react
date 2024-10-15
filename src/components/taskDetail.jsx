import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { state } = useLocation();
  const { id } = useParams(); // Get task ID from the URL
  const [task, setTask] = useState(state?.task || null); // Try to use state or set as null initially
  const [loading, setLoading] = useState(!task); // Show loader only if we need to fetch the task
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!task) { // Only fetch if task is not already in state
        setLoading(true);
        try {
          const token = localStorage.getItem('access'); // Replace with your token key
          const response = await fetch(`http://localhost:8000/to-do-list/tasks/${id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch task.');
          }

          const data = await response.json();
          setTask(data);
        } catch (error) {
          setError('Error fetching task.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [id, task]);

  if (loading) {
    return <div>Loading task...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!task) {
    return <div>No task found.</div>;
  }

  return (
    <div>
      <h1>Task Details</h1>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.due_date || 'No due date'}</p>
      <p>Completion Date: {task.done_at || 'Not completed'}</p>
    </div>
  );
};

export default TaskDetail;
