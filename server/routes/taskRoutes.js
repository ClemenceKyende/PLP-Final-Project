const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Daily Tasks
router.post('/daily', taskController.createDailyTask);
router.get('/daily', taskController.getAllDailyTasks);
router.put('/daily/:id', taskController.updateDailyTask);
router.delete('/daily/:id', taskController.deleteDailyTask);

// Weekly Tasks
router.post('/weekly', taskController.createWeeklyTask);
router.get('/weekly', taskController.getAllWeeklyTasks);
router.put('/weekly/:id', taskController.updateWeeklyTask);
router.delete('/weekly/:id', taskController.deleteWeeklyTask);

// Monthly Tasks
router.post('/monthly', taskController.createMonthlyTask);
router.get('/monthly', taskController.getAllMonthlyTasks);
router.put('/monthly/:id', taskController.updateMonthlyTask);
router.delete('/monthly/:id', taskController.deleteMonthlyTask);

// Routes for Priority Tasks
router.post('/priority', taskController.createPriorityTask);
router.get('/priority', taskController.getPriorityTasks);
router.put('/priority/:id', taskController.updatePriorityTask);
router.delete('/priority/:id', taskController.deletePriorityTask);

// Routes for Organized Tasks
router.post('/organized', taskController.createOrganizedTask);
router.get('/organized', taskController.getOrganizedTasks);
router.put('/organized/:id', taskController.updateOrganizedTask);
router.delete('/organized/:id', taskController.deleteOrganizedTask);
 

module.exports = router;
