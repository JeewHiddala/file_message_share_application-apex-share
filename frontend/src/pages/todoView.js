import React, { useEffect, useState } from "react";
import TextInput from "../components/formsComponents/textInput";
import NumberInput from "../components/formsComponents/numberInput";
import Button from "../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import taskServiceRoutes from "../routes/taskServiceRoutes.routes";

function ToDoView() {
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

  const back = () => {
    navigation("/");
  };

  return (
    <div className="container mt-5">
      <h4>Create Task</h4>
      <TextInput label={"Task Name"} value={taskName} />
      <NumberInput label={"Cost"} value={cost} />
      <Button
        type={"button"}
        className={"btn btn-dark"}
        tag={"Back"}
        onClick={() => back()}
      />
    </div>
  );
}

export default ToDoView;
