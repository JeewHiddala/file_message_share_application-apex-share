const Task = require('../models/task.model');
const mongoose = require("mongoose");
//create a task to db
const createTask = async (req, res) => {
  if (req.body) {
    const task = new Task(req.body);
    await task
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

//get all tasks
const getAllTasks = async (req, res) => {
  //use populate to get data from other collection.
  await Task.find({})
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getTaskByTaskId = async (req, res) => {
  if (req.params && req.params.id) {
    await Task.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

//get subjects for task, when pass task id.
const getCategoryforTask = async (req, res) => {
  if (req.params && req.params.id) {
    await Task.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data.categories });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const updateTask = async (req, res) => {
  //update selected task
  if (req.params && req.params.id) {
    const { id } = req.params; // fetching the id of the status.
    const task = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No task With That id"); // validating the task id
    const updatedTask = await Task.findByIdAndUpdate(id, task, {
      new: true,
    }); // find task and update task
    res.json(updatedTask);
  }
};

const deleteTask = async (req, res) => {
  // delete selected task.
  if (req.params && req.params.id) {
    const { id } = req.params; // fetching the id of the task
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No task with id: ${id}`); //validating the task id.
    await Task.findByIdAndDelete(id); // find task and remove task.
    res.json({ message: "task deleted successfully." });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskByTaskId,
  getCategoryforTask,
  updateTask,
  deleteTask,
};
