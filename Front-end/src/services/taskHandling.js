import API from "../api/axios.js";

export function getUserFromStorage(location) {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined") {
      return location.state?.user || null;
    }

    return JSON.parse(storedUser);
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return null;
  }
}



export async function fetchTasksFromAPI(setTasks) {
  const token = localStorage.getItem("token");
  try {
    const response = await API.get("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(response.data);
  } catch (error) {
    console.error("Failed to fetch tasks:", error.response?.data || error.message);
  }
}

export async function createTask(values, setTasks, resetForm) {
  const token = localStorage.getItem("token");
  try {
    const response = await API.post("/api/tasks", values, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prev) => [...prev, response.data]);
    resetForm();
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error.message);
    alert("Could not create task");
  }
}

export async function deleteTaskById(id, setTasks) {
  const token = localStorage.getItem("token");
  try {
    await API.delete(`/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    alert("Failed to delete");
  }
}

export async function updateTaskById(updatedTask, setTasks, onClose) {
  const token = localStorage.getItem("token");
  try {
    const { id, ...dataWithoutId } = updatedTask; // Keep userId this time
    const response = await API.put(`/api/tasks/${id}`, dataWithoutId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? response.data : t))
    );
    onClose();
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    alert("Error updating task.");
  }
}
