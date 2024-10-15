import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './todoList.css'; // Import the CSS file

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('access'); // Adjust the key as needed
        const response = await fetch('http://localhost:8000/to-do-list/tasks/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const token = localStorage.getItem('access'); // Adjust the key as needed
      const response = await fetch('http://localhost:8000/to-do-list/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      const token = localStorage.getItem('access');
      const response = await fetch(`http://localhost:8000/to-do-list/tasks/${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 2 }), // Assuming 2 is the status for completed
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleTaskClick = (task) => {
    navigate(`/tasks/${task.id}`, { state: { task } });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.status === 2 ? 'completed' : ''} onClick={() => handleTaskClick(task)}>
            <span>{task.title}</span>
            <span>{task.description}</span>
            <button className="complete" onClick={() => handleCompleteTask(task)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
