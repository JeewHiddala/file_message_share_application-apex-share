import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom' //make routes
import Footer from './components/footer/footer'
import WorkingEmployee from './components/managerComponents/views/employeeManagement/workingEmployee' //IT19007502 - Hiddalarachchi J.
import CreateEmployee from './components/managerComponents/createForms/employeeManagament/createEmployee' //IT19007502 - Hiddalarachchi J.
import UpdateProfile from "./components/profile/profile-update";
import UpdateProfileImage from "./components/profile/image-update";
import Login from './components/login/login.component'
import Profile from './components/profile/profile.component'
import NavBar from './components/navBar/navBar'

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <section>
          <Routes>
            {/* <ManagerDashboard> */}
            <Route
              path="/workingEmployee"
              element={<WorkingEmployee />}
            ></Route>
            <Route path="/createEmployee" element={<CreateEmployee />}></Route>
            {/* </ManagerDashboard>  */}
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/update-image" element={<UpdateProfileImage />} ></Route>
            {/* <Route exact path="/update-image/:id" element={<UpdateProfileImage />} ></Route> */}
            <Route exact path="/profile" element={<Profile />}></Route>
          </Routes>
        </section>
        <Footer />
      </Router>
    </div>
  )
}

export default App
