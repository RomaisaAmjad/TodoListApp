import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EditTask from '../components/EditTask.jsx';
import API from '../api/axios.js';

function Tasks() {
  const location = useLocation();
  const navigate = useNavigate();

  const user =
    location.state?.user || JSON.parse(localStorage.getItem('user')) || null;

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); 
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      alert('Please log in first');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await API.get('/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Failed', error);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: name === 'isCompleted' ? value === 'true' : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!taskData.title || !taskData.description) {
      alert('Please fill out all fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in!');
      return;
    }

    try {
      const response = await API.post('/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
      alert('Incomplete Data!');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in!');
      return;
    }

    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete');
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold">Hello {user?.username || 'User'}</h1>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={taskData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={taskData.description}
          onChange={handleChange}
        />
        <select
          name="isCompleted"
          value={taskData.isCompleted}
          onChange={handleChange}
        >
          <option value={false}>false</option>
          <option value={true}>true</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">{user?.username}'s Tasks:</h2>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> — {task.description}{' '}
                [{task.isCompleted ? '✅ Completed' : '❌ Incomplete'}]
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2 ml-2 text-white bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="p-2 ml-2 text-white bg-blue-600"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Edit Modal */}
      {editingTask && (
        <EditTask
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdate={async (updatedTask) => {
            const token = localStorage.getItem('token');
            try {
              const response = await API.put(
                `/tasks/${updatedTask.id}`,
                updatedTask,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              setTasks((prevTasks) =>
                prevTasks.map((t) =>
                  t.id === updatedTask.id ? response.data : t
                )
              );
              setEditingTask(null);
            } catch (error) {
              console.error('Failed to update task:', error);
              alert('Error updating task.');
            }
          }}
        />
      )}
    </div>
  );
}

export default Tasks;
