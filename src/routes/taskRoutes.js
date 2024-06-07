const express = require('express');
const multer = require('multer');
const taskController = require('../controllers/taskcontroller');
const { validateTaskFields } = require('../Middlewares/validationMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), taskController.importTasks);
router.get('/', taskController.getTasks);
router.post('/', validateTaskFields, taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id', validateTaskFields, taskController.updateTask);
router.patch('/:id/complete', taskController.completeTask);

module.exports = router;
