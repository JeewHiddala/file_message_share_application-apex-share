import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; //make routes
import Header from "./layouts/header";
import ToDoList from "./pages/todoList";
import CreateTask from "./pages/createTask";
import EditTask from "./pages/editTask";
import ToDoView from "./pages/todoView";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/todolist" />}></Route>
          <Route path="/createtask" element={<CreateTask />}></Route>
          <Route exact path="/todolist" element={<ToDoList />}></Route>
          <Route exact path="/edittask" element={<EditTask />}></Route>
          <Route path="/todo" element={<ToDoView />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
