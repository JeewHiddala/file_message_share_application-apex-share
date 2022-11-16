const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  cost: { type: Number, required: true }
});

const Task = mongoose.model("tasks", TaskSchema);

module.exports = Task;