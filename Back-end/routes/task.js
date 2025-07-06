const { Router } = require('express');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const {validateTaskPost, validateTaskPut} = require('../validators/task.validator');
const { authenticateUser } = require('../middlewares/auth.middleware');
const {accessControl} = require('../middlewares/accessControl.middleware');
const controller = require('../controllers/task.controller');

const router = Router();

router.use(authenticateUser);

router.get('/', controller.getAllTasks);
router.post('/', validateMiddleware(validateTaskPost), controller.createTask);
router.put('/:id',accessControl,validateMiddleware(validateTaskPut),controller.updateTask);
router.delete('/:id',accessControl,controller.deleteTask);

module.exports = router;
