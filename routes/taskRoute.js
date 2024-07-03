const express = require('express');
const taskController= require('../controller/taskController.js');
const router = express.Router();
 const verifyJWT= require("../middleware/authMiddleware.js");


router.post('/add', verifyJWT, taskController.addTask);
router.put('/:taskId', verifyJWT, taskController.editTask);
router.delete('/:taskId', verifyJWT, taskController.deleteTask);
router.patch('/state/:taskId', verifyJWT, taskController.updateTaskState);
router.patch('/:taskId/checklists/:checklistId', verifyJWT, taskController.toggleChecklistItem);
router.get('/', verifyJWT, taskController.getTasksByDuration);
router.get('/analytics', verifyJWT, taskController.getTasksAnalytics);


router.get('/:taskId', taskController.getSingleTask);

module.exports=router