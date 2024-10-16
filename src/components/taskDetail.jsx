import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './taskDetail.css'

const TaskDetail = () => {
  const { id } = useParams(); // Get task ID from the URL
  const [task, setTask] = useState(null); // Remove reliance on state from useLocation
  const [loading, setLoading] = useState(true); // Show loader while fetching task
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', status: '', due_date: '' });
  const [updateError, setUpdateError] = useState(null); // Error state for the PUT request
  const [successMessage, setSuccessMessage] = useState(null); // Success state for updates

  useEffect(() => {
    const fetchTask = async () => {
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
        setEditData({
          title: data.title,
          description: data.description,
          status: data.status,
          due_date: data.due_date,
        });
      } catch (error) {
        setError('Error fetching task.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask(); // Fetch task on component mount
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setUpdateError(null); // Reset any previous errors
    setSuccessMessage(null); // Reset success message

    try {
      const token = localStorage.getItem('access');
      const response = await fetch(`http://localhost:8000/to-do-list/tasks/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task.');
      }

      const updatedTask = await response.json();
      setTask(updatedTask); // Update the task with the new data
      setSuccessMessage('Task updated successfully!');
    } catch (error) {
      setUpdateError('Error updating task. Please try again.');
    }
  };

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
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {updateError && <div style={{ color: 'red' }}>{updateError}</div>}
      <form onSubmit={handleUpdateTask} id='form'>
        <div>
          <label>Title:</label>
          <input
            id='input'
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            id='input'
            type="text"
            name="description"
            value={editData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            id='input'
            name="status"
            value={editData.status}
            onChange={handleInputChange}
          >
            <option value="1">Incomplete</option>
            <option value="2">Complete</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={editData.due_date || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskDetail;
