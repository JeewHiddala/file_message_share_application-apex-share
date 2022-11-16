import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../../../css/dash.css'
import Animation from '../../animation/animation'

class WorkingEmployee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      isDropdownClicked: false,
      loading: true,
    }
    this.navigateCreateEmployeePage = this.navigateCreateEmployeePage.bind(this)
    this.dropdown = this.dropdown.bind(this)

  }

  componentDidMount() {
    //inbuild function
    this.fetchWorkingEmployee()
  }

  fetchWorkingEmployee() {
    this.setState({ loading: false })
    axios
      .get('http://localhost:4444/employee/')
      .then((response) => {
        this.setState({ employees: response.data.data })
        this.setState({ loading: true })

      })
  }


  navigateCreateEmployeePage(e) {
    window.location = '/createEmployee'
  }


  

  dropdown(e) {
    this.setState((prevState) => ({
      isDropdownClicked: !prevState.isDropdownClicked,
    }))
  }

 

  render() {
    const { isDropdownClicked } = this.state
    if (this.state.loading === false) {
      return <Animation />
    } else {
      return (
        <div>
          <br />
          <br />

          {/* <h1 class="hotel-name"> Hotel Skylight</h1>
                <br />
                <div class="container">
                    <div class="row justify-content-end">
                        <div class="col-1">
                            Username
                        </div>
                    </div>
                </div> */}
          <br />
          <div className="row justify-content-center" id="dash-box">
            <div className="container-dash">
              <h3>
                <b className="super-topic">Admin Dashboard</b>
              </h3>
              <div className="row justify-content-evenly">
                <div className="col-8">
                  <div className="container">
                    <div className="float-end">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) => this.navigateCreateEmployeePage(e)}
                      >
                        Create Employee
                      </button>
                    </div>

 
                    <div className="col-4">
                      <h4 className="topic">
                        <b>Employees DataTable</b>
                      </h4>
                    </div>

                    <br />
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="table-dark">
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile No</th>
                            <th scope="col">NIC No</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Username</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.employees.length > 0 &&
                            this.state.employees.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.position}</td>
                                <td>{item.email}</td>
                                <td>{item.mobileNumber}</td>
                                <td>{item.nicNo}</td>
                                <td>{item.salary}</td>
                                <td>{item.userName}</td>
                                
                               
                              </tr>
                            ))}
                        </tbody>
                      </table>
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
}

export default WorkingEmployee
