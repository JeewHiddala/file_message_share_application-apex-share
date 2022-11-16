import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import taskServiceRoutesRoutes from "../routes/taskServiceRoutes.routes";

function ToDoList() {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState();

  useEffect(() => {
    taskServiceRoutesRoutes
      .getAllTasks()
      .then((res) => {
        setTaskData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createTask = () => {
    navigate("/createtask");
  };

  const viewTask = (data) => {
    navigate("/todo", {
      state: {
        data: data,
      },
    });
  };

  const editTask = (data) => {
    navigate("/edittask", {
      state: {
        data: data,
      },
    });
  };

  const deleteTask = (id) => {
    taskServiceRoutesRoutes.deleteTask(id).then((response) => {
      alert("Data successfully Deleted");
      window.location.reload(false);
    });
  };

  return (
    <div className="container mt-5">
      <h4>ToDo List</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Cost</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {taskData ? (
            taskData.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index+1}</th>
                  <td>{item.taskName}</td>
                  <td>{item.cost}</td>
                  <td>
                    <Button
                      className={"btn btn-info"}
                      tag={"View"}
                      onClick={() => viewTask(item._id)}
                    />
                  </td>
                  <td>
                    <Button
                      className={"btn btn-warning"}
                      tag={"Edit"}
                      onClick={() => editTask(item._id)}
                    />
                  </td>
                  <td>
                    <Button
                      className={"btn btn-danger"}
                      tag={"Delete"}
                      onClick={() => deleteTask(item._id)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <h6>No Task Created</h6>
            </tr>
          )}
        </tbody>
      </table>
      <div className="row">
        <div className="col-4">
          <Button
            type={"button"}
            className={"btn btn-success"}
            tag={"Create New Task"}
            onClick={() => createTask()}
          />
        </div>
      </div>
    </div>
  );
}
export default ToDoList;
