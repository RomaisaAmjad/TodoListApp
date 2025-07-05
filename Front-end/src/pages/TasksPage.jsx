import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditTask from "../components/EditTask.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  fetchTasksFromAPI,
  createTask,
  deleteTaskById,
  updateTaskById,
} from "../Functions/taskHandling.js";


function getStoredUser() {
  const userData = localStorage.getItem("user");
  if (!userData || userData === "undefined") return null;

  try {
    return JSON.parse(userData);
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
}

function Tasks() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      alert("Please log in first");
      navigate("/login");
    } else {
      setUser(storedUser);
    }

    setCheckingAuth(false);
  }, [navigate]);

  useEffect(() => {
    if (user) fetchTasksFromAPI(setTasks);
  }, [user]);

  const taskSchema = Yup.object().shape({
    title: Yup.string().min(3).max(100).required("Title is required"),
    description: Yup.string().min(5).required("Description is required"),
    isCompleted: Yup.boolean(),
  });

  if (checkingAuth) return <div className="text-center">Loading...</div>;

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold">Hello {user?.username || "User"}</h1>

      <Formik
        initialValues={{ title: "", description: "", isCompleted: false }}
        validationSchema={taskSchema}
        onSubmit={(values, { resetForm }) =>
          createTask({ ...values, userId: user.id }, setTasks, resetForm)
        }
      >
        <Form className="flex flex-col items-center gap-2 mt-4">
          <Field name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" className="text-red-500" />

          <Field name="description" placeholder="Description" />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500"
          />

          <Field as="select" name="isCompleted">
            <option value={false}>Incomplete</option>
            <option value={true}>Completed</option>
          </Field>

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">{user?.username}'s Tasks:</h2>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> — {task.description} [
                {task.isCompleted ? "✅ Completed" : "❌ Incomplete"}]
                <button
                  onClick={() => deleteTaskById(task.id, setTasks)}
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

      {editingTask && (
        <EditTask
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdate={(updatedTask) =>
            updateTaskById(updatedTask, setTasks, () => setEditingTask(null))
          }
        />
      )}
    </div>
  );
}

export default Tasks;
