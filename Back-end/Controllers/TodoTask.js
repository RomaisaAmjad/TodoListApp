const { Task } = require("../models/index.js");
const { asyncWrapper } = require("../Middlewares/AsyncWrapper");

exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.userId } });
  res.send(tasks);
});

exports.createTask = asyncWrapper(async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const userId = req.userId;
  const task = await Task.create({ title, description, isCompleted, userId });
  res.status(201).send(task);
});

exports.updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task || task.userId !== req.userId) {
    return res.status(403).send("Unauthorized or Task not found.");
  }

  await task.update(req.body);
  res.status(200).send(task);
});

exports.deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task || task.userId !== req.userId) {
    return res.status(403).send("Unauthorized or Task not found.");
  }

  await task.destroy();
  res.status(200).send("Task deleted successfully!");
});
