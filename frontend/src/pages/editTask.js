import React, { useEffect, useState } from "react";
import TextInput from "../components/formsComponents/textInput";
import NumberInput from "../components/formsComponents/numberInput";
import Button from "../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import taskServiceRoutes from "../routes/taskServiceRoutes.routes";

function EditTask() {
  const navigation = useNavigate();
  const location = useLocation();
  const transferData = location.state.data;
  const [taskName, setTaskName] = useState();
  const [cost, setCost] = useState();

  useEffect(() => {
    const getTaskByTaskId = async () => {
      await taskServiceRoutes
        .getTaskByTaskId(transferData)
        .then((response) => {
          setTaskName(response.data.data.taskName);
          setCost(response.data.data.cost);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTaskByTaskId();
  }, [transferData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedTask = {
      taskName: taskName,
      cost: cost,
    };

    taskServiceRoutes
      .updateTask(transferData, updatedTask)
      .then((response) => {
        alert("Data successfully Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const back = () => {
    navigation("/");
  };

  return (
    <div className="container mt-5">
      <h4>Edit Task</h4>
      <form onSubmit={handleSubmit}>
        <TextInput
          label={"Task Name"}
          value={taskName}
          onchange={(e) => setTaskName(e.target.value)}
        />
        <NumberInput
          label={"Cost"}
          value={cost}
          onchange={(e) => setCost(e.target.value)}
        />
        <Button
          type={"submit"}
          className={"btn btn-warning"}
          tag={"Update Task"}
        />
        <Button
          type={"button"}
          className={"btn btn-dark ms-2"}
          tag={"Back"}
          onClick={() => back()}
        />
      </form>
    </div>
  );
}

export default EditTask;
