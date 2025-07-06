const {Task} = require('../models');

exports.accessControl = async (req, res, next) => {

    const {id} = req.params;
    const task = await Task.findByPk(id);
    if (!task || task.userId !== req.userId) {
        return res.status(404).send("Task not found.");
      }

      req.task = task;
      next();
    
};
