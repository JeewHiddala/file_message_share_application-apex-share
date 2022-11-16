const express = require("express");
const router = express.Router();
const taskController = require('../controllers/task.controller');

module.exports = function () {
  router.post('/add', taskController.createTask);
  router.get("/", taskController.getAllTasks);
  router.get("/getbyid/:id", taskController.getTaskByTaskId);
  router.get("/getcategorybytaskid/:id", taskController.getCategoryforTask);
  router.patch("/updatetask/:id", taskController.updateTask);
  router.delete("/deletetask/:id", taskController.deleteTask);
  return router;
}