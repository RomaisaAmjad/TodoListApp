import React, { useState, useEffect } from "react";

function EditTask({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted || false);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setIsCompleted(task.isCompleted);
  }, [task]);

  const handleUpdateClick = () => {
    const updatedTask = {
      id: task.id,
      title,
      description,
      isCompleted,
    };

    onUpdate(updatedTask);
    onClose();
  };

  return (
    <div className="fixed mt-10 inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex items-center justify-center z-30">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 shadow-lg border-red-900 border-3">
        <h2 className="text-xl font-bold text-center text-red-900 mb-4">Edit Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              className="w-full p-2 bg-amber-50 rounded focus:outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <input
              type="text"
              className="w-full p-2 bg-amber-50 rounded focus:outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold ">Status</label>
            <select
              className="w-full p-2 bg-amber-50 rounded"
              value={isCompleted}
              onChange={(e) => setIsCompleted(e.target.value === "true")}
            >
              <option value={false}>Incomplete</option>
              <option value={true}>Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateClick}
            className="px-4 py-2 bg-amber-700 text-white rounded hover:cursor-pointer"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;