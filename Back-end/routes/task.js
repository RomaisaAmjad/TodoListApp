const { Router } = require('express');
const { validateTask } = require('../Middlewares/validateTask');
const { authenticateUser } = require('../Middlewares/authMiddleware');
const controller = require('../Controllers/TodoTask');

const router = Router();

router.use(authenticateUser);

router.get('/', controller.getAllTasks);
router.post('/', validateTask, controller.createTask);
router.put('/:id', validateTask, controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
