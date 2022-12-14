import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../../../css/dash.css'
import AuthService from '../../../../services/auth.service'

const initialState = {
  //initiate states
  name: '',
  position: '',
  email: '',
  mobileNumber: 0,
  nicNo: '',
  salary: 0,
  userName: '',
  password: '',
  userData: '',
}

class CreateEmployee extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this) //bind onChange function.
    this.onSubmit = this.onSubmit.bind(this) //bind onSubmit function.
    this.back = this.back.bind(this)
    this.state = initialState //apply states.
  }

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value })
  }

  back(e) {
    window.location = '/workingEmployee'
  }

  onSubmit(e) {
    //submit details
    e.preventDefault() //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
    console.log("1111");
      AuthService.register(
        this.state.userName,
        this.state.password,
        this.state.position
      ).then(
        (response) => {
          console.log("3333");
          this.setState({
            userData: response.data.data._id,
          })
          let employee = {
            name: this.state.name,
            position: this.state.position,
            email: this.state.email,
            mobileNumber: this.state.mobileNumber,
            nicNo: this.state.nicNo,
            salary: this.state.salary,
            userName: this.state.userName,
            password: this.state.password,
            userData: this.state.userData,
          }
          console.log('DATA TO SEND', employee)
          axios
            .post('http://localhost:4444/employee/create', employee)
            .then((response) => {
              console.log("2222");
              // alert('Employee Data successfully inserted')
              this.setState({
                name: '',
                position: '',
                email: '',
                mobileNumber: 0,
                nicNo: '',
                salary: 0,
                userName: '',
                password: '',
                userData: '',
              })
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New Employee details has been saved',
                showConfirmButton: false,
                timer: 1500,
              })
            })
            .catch((error) => {
              console.log(error.message)
              alert(error.message)
            })
        },
        (error) => {
          alert('Auth signup failed')
        }
      )
   
  }

  render() {
    return (
      <div>
        <br />
        <br />

        <br />
        <div className="row justify-content-center">
          <div className="container-dash">
            <h3>
              <b className="super-topic">Admin Dashboard</b>
            </h3>
            <div className="row justify-content-evenly">
              <div className="col-8">
                <div className="container">


                  <div className="col-4">
                    <br />
                    <h4 className="topic">
                      <b>Add new Employee</b>
                    </h4>
                  </div>

                  <br />
                  <div className="container">
                    <form onSubmit={this.onSubmit}>
                      <div className="row mb-3">
                        <div className="col-6">
                          <label
                            htmlFor="name"
                            className="form-label sub-topic"
                          >
                            Employee Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Employee name"
                            id="name"
                            name="name" //give state name
                            required
                            value={this.state.name} //bind state value
                            onChange={this.onChange} //don't call function. only give a reference.
                          />
                        </div>
                        <div className="col-6">
                          <label
                            htmlFor="position"
                            className="form-label sub-topic"
                          >
                            Position
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={this.onChange}
                            value={this.state.position}
                            name="position"
                          >
                            <option selected>Assign role to employee</option>
                            <option value="manager">Manager</option>
                            <option value="worker">Worker</option>
                    
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6">
                          <label
                            htmlFor="address"
                            className="form-label sub-topic"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email Address"
                            
                            id="email"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="col-6">
                          <label
                            htmlFor="mobileNumber"
                            className="form-label sub-topic"
                          >
                            Mobile Number
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="mobileNumber"
                            name="mobileNumber"
                            
                            maxLength="11"
                            minLength="11"
                            required
                            value={this.state.mobileNumber}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="nic" className="form-label sub-topic">
                            National Identity Card Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter National Identity Card Number"
                            id="nicNo"
                            name="nicNo" //give state name
                           
                            required
                            value={this.state.nicNo} //bind state value
                            onChange={this.onChange} //don't call function. only give a reference.
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor="userName"
                            className="form-label sub-topic"
                          >
                            Salary
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="salary"
                            name="salary"
                            value={this.state.salary}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label
                            htmlFor="password"
                            className="form-label sub-topic"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            id="userName"
                            name="userName"
                            minLength="2"
                            value={this.state.userName}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor="password"
                            className="form-label sub-topic"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            id="password"
                            name="password"
                            minLength="2"
                            // required
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col mb-3">
                          <button
                            type="button"
                            id="button"
                            className="btn btn-secondary"
                            onClick={(e) => this.back(e)}
                          >
                            {' '}
                            Back
                          </button>
                          {/* <button type="button" id="button" className="btn btn-info" > Clear</button> */}
                        </div>
                        <div className="col mb-3">
                          <button
                            type="submit"
                            id="button"
                            className="btn btn-success float-end"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default CreateEmployee
