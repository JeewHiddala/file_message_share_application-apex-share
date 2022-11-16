import Axios from "./axios";

const createTask = (task) => {
  return Axios.post("/task/add", task);
};

const getAllTasks = () => {
  return Axios.get("/task");
};

const getTaskByTaskId = async (taskID) => {
  return await Axios.get("/task/getbyid/" + taskID);
};

const getCategoryByTaskId = async (taskID) => {
  return await Axios.get("/task/getcategorybytaskid/" + taskID);
};

// const getTaskByTaskName = (statusName) => {
//   return Axios.get("/status/getbystatusname/"+statusName);
// };

const updateTask = (id, task) => {
  return Axios.patch("/task/updatetask/" + id, task);
};

const deleteTask = (taskID) => {
  return Axios.delete("/task/deletetask/" + taskID);
};

const TaskService = {
  createTask,
  getAllTasks,
  getTaskByTaskId,
  getCategoryByTaskId,
  updateTask,
  deleteTask,
};

export default TaskService;
