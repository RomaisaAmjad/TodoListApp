const { Router } = require('express');
const { validateMiddleware } = require('../Middlewares/validateMiddleware');
const {validateTaskPost, validateTaskPut} = require('../validators/taskValidator');
const { authenticateUser } = require('../Middlewares/authMiddleware');
const controller = require('../Controllers/TodoTask');

const router = Router();

router.use(authenticateUser);

router.get('/', controller.getAllTasks);
router.post('/', validateMiddleware(validateTaskPost), controller.createTask);
router.put('/:id', validateMiddleware(validateTaskPut), controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
