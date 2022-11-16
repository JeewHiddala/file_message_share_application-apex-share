import React, { useState } from "react";
import TextInput from "../components/formsComponents/textInput";
import NumberInput from "../components/formsComponents/numberInput";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import taskServiceRoutes from "../routes/taskServiceRoutes.routes";

function CreateTask() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState();
  const [cost, setCost] = useState();

  const handleSubmit = (e) => {
    let task = {
      taskName: taskName,
      cost: cost,
    };

    taskServiceRoutes
      .createTask(task)
      .then((response) => {
        alert("Data successfully inserted");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const back = () => {
    navigate("/");
  };
  return (
    <div className="container mt-5">
      <h4>Create Task</h4>
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
          className={"btn btn-success"}
          tag={"Add New Task"}
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

export default CreateTask;
