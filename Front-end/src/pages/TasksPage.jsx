import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditTask from "../components/EditTask.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavBar from "../components/Navbar.jsx";


import {
  fetchTasksFromAPI,
  createTask,
  deleteTaskById,
  updateTaskById,
} from "../services/taskHandling.services.js";


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

    <div className="relative bg-red-100">
        <div className="fixed top-0 left-0 w-full z-50">
         <NavBar />
  </div>
    <div className="text-center min-h-screen bg-red-100">
      <div className="mt-20">
      <h1 className="text-xl font-bold p-3 bg-red-900 text-white">{user?.username || "User"}'s Task dashboard</h1>

      <Formik
        initialValues={{ title: "", description: "", isCompleted: false }}
        validationSchema={taskSchema}
        onSubmit={(values, { resetForm }) =>
          createTask({ ...values, userId: user.id }, setTasks, resetForm)
        }
      >
        <Form className="flex flex-col gap-3 mt-6 border-2 border-red-900 p-6 rounded-md bg-white mx-auto w-full max-w-md shadow-md">
          <Field className="p-2 border-1 border-grey-800 rounded-md"  name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" className="text-red-800 text-left text-sm" />

          <Field className="p-2 border-1 border-grey-800 rounded-md" name="description" placeholder="Description" />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-800 text-left text-sm"
          />

          <Field as="select" name="isCompleted" className="p-2 border-1 border-grey-800 rounded-md">
            <option value={false}>Incomplete</option>
            <option value={true}>Completed</option>
          </Field>

          <button className="bg-red-800 text-white p-2 rounded-md hover:cursor-pointer hover:bg-red-900" type="submit">Submit</button>
        </Form>
      </Formik>
      </div>

      <div className="mt-6">
        {tasks.length === 0 ? (
          <p className="  text-red-800 text-center text-sm font-bold mb-7">No tasks found. Add a task to get started!</p>
        ) : (
          <ul className="flex flex-col gap-3 shadow-2 shadow-red-900 m-3 text-justify  md:text-justify p-3 bg-white rounded-md shadow-md mb-10 " >
            {tasks.map((task) => (
              
              <li key={task.id}>
                <div className="flex flex-col md:flex-row md:justify-between gap-3 p-3 border-b  border-red-200">
                <div>
                <strong>{task.title}</strong> — {task.description} 
                {task.isCompleted ? " ✅ " : " ❌ "}
                </div>
                <div>
                <button
                  onClick={() => deleteTaskById(task.id, setTasks)}
                  className="p-2 px-4 m-3 text-white bg-red-700 rounded-md hover:cursor-pointer hover:bg-red-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="p-2 px-6 ml-2 text-white bg-amber-600 rounded-md hover:cursor-pointer hover:bg-amber-700"
                >
                  Edit
                </button>
                </div>
                </div>
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
      <div className="p-6">
      <Link to='/' className="bg-red-800 p-4 rounded-md px-6 font-bold text-white hover:cursor-pointer hover:bg-red-900">Log Out</Link>
      </div>
    </div>
  
    </div>
  );
}

export default Tasks;
