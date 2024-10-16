import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './todoList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState('http://localhost:8000/to-do-list/tasks/');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async (pageUrl) => {
      try {
        const token = localStorage.getItem('access');
        const response = await fetch(pageUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks.');
        }

        const data = await response.json();
        setTasks(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks(currentPage);
  }, [currentPage]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    try {
      const token = localStorage.getItem('access');
      const response = await fetch('http://localhost:8000/to-do-list/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, due_date: dueDate }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task.');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setDueDate('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCompleteTask = async (task, num) => {
    try {
      const token = localStorage.getItem('access');
      const response = await fetch(`http://localhost:8000/to-do-list/tasks/${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: num }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task.');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('access');
      const response = await fetch(`http://localhost:8000/to-do-list/tasks/${taskId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task.');
      }

      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskClick = (task) => {
    navigate(`/tasks/${task.id}`, { state: { task } });
  };

  return (
    <div id="white-box">
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <div id="tasks" className={task.status === 2 ? 'completed' : ''} onClick={() => handleTaskClick(task)}>
              <li><span>{task.title} | </span></li>
              <span>| Due: {task.due_date}</span>

              <button className="complete" onClick={(e) => { e.stopPropagation(); handleCompleteTask(task, 2); }}>
                Check
              </button>
              
              <button type="reset" onClick={(e) => { e.stopPropagation(); handleCompleteTask(task, 1); }} id='uncheck'>
                Uncheck
              </button>

              <button className="delete" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>

      <div className="pagination">
        {prevPage && <button onClick={() => setCurrentPage(prevPage)}>Previous</button>}
        {nextPage && <button onClick={() => setCurrentPage(nextPage)}>Next</button>}
      </div>
    </div>
  );
};

export default TaskList;
