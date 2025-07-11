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
    <div className="fixed inset-0 bg-[rgba(231, 220, 220, 0.83)] backdrop-blur-md flex items-center justify-center z-30">
      <div className="bg-white p-2 rounded-2xl md:w-3/9 shadow-lg border-gray-700 border-3">
        <h2 className="text-md font-bold text-center text-gray-800 mb-4">Edit Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm">Title</label>
            <input
              type="text"
              className="w-3/4 px-2 p-2 bg-amber-50 rounded-2xl focus:outline text-xs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm">Description</label>
            <input
              type="text"
              className="w-3/4 px-2 p-2 bg-amber-50 rounded-2xl focus:outline text-xs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm">Status</label>
            <select
              className="w-3/4 px-2 p-2 bg-amber-50 rounded-2xl focus:outline text-xs"
              value={isCompleted}
              onChange={(e) => setIsCompleted(e.target.value === "true")}
            >
              <option value={false}>Processing</option>
              <option value={true}>Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-800 text-white text-sm rounded-3xl hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateClick}
            className="px-4 py-1 mr-3 text-sm bg-green-700 text-white rounded-3xl hover:cursor-pointer"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;