import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditTask from "../components/EditTask.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
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
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return task.isCompleted === true;
    if (filterStatus === "processing") return task.isCompleted === false;
  });

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
    <div>
      <NavBar />

      <div className="text-center min-h-screen p-20 bg-center bg-gray-900">
        <div>
          <Formik
            initialValues={{ title: "", description: "", isCompleted: false }}
            validationSchema={taskSchema}
            onSubmit={(values, { resetForm }) =>
              createTask({ ...values, userId: user.id }, setTasks, resetForm)
            }
          >
            <Form className="flex flex-row justify-center items-center gap-2">
           
              <Field
                className="p-1 pl-2 border-1 bg-white text-gray-900 rounded-xl text-sm"
                name="title"
                placeholder="Title"
              />
              <Field
                className="p-1 pl-2 border-1 bg-white text-gray-900 rounded-xl text-sm"
                name="description"
                placeholder="Description"
              />
             

              <Field
                as="select"
                name="isCompleted"
                className="p-1 px-2 text-sm rounded-2xl bg-green-100 text-gray-900"
              >
                <option value={false}>Processing</option>
                <option value={true}>Completed</option>
              </Field>

              <button
                className="bg-yellow-500 text-white p-2 px-4 py-2 rounded-2xl text-xs hover:cursor-pointer hover:bg-yellow-600"
                type="submit"
              >
                <h6>Add task</h6>
              </button>
            </Form>
          </Formik>
        </div>

        <div className="m-3 flex flex-row justify-center items-center gap-2" >
          <p className="font-bold text-white ">Filter By : </p>
          <select
            className="p-1 px-2 rounded-xl text-xs bg-green-100 text-gray-900"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
          </select>
        </div>

 

        <div className="mt-4">
          {filteredTasks.length === 0 ? (
            <p className="text-white text-center text-sm font-bold mb-7">
              No tasks found!
            </p>
          ) : (
            <ul className="flex flex-col gap-2 bg-gray-300 shadow-md mb-10 p-4 mt-4 rounded-xl text-gray-800 text-sm mx-auto max-w-3xl">
              {filteredTasks.map((task) => (
                <li key={task.id}>
                  <div className="flex flex-col md:flex-row items-start justify-between gap-2 px-4 py-2 rounded-md ">
                    <div className="md:w-2/5 w-full text-left">
                      <p className="font-semibold mb-0">{task.title}</p>
                      <p className="text-xs text-gray-600">
                        {task.description}
                      </p>
                    </div>

                    <div className="md:w-1/6 w-full text-left">
                      <p className="font-semibold mb-0">Status</p>
                      <p className="text-xs">
                        {task.isCompleted ? "Completed" : "Processing"}
                      </p>
                    </div>

                    <div className="flex gap-2 md:w-1/6 w-full justify-start md:justify-end">
                      <button
                        onClick={() => deleteTaskById(task.id, setTasks)}
                        className="p-2 text-white bg-red-700 rounded-full hover:bg-red-800"
                        title="Delete"
                      >
                        <FaTrashAlt size={12} />
                      </button>
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-2 text-white bg-teal-600 rounded-full hover:bg-teal-700"
                        title="Edit"
                      >
                        <FaEdit size={12} />
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
      </div>
    </div>
  );
}

export default Tasks;
