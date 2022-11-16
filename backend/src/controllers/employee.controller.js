const Employee = require('../models/employee.model');       //import employee model
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;



const createEmployee = async (req, res) => {       //create a employee to db.
    if (req.body) {

        let password = req.body.password;
        let bycryptedPassword = bcrypt.hashSync(password, saltRounds);

        console.log("bycryptedPassword",bycryptedPassword);

        let emp = {
            name: req.body.name,
            position: req.body.position,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            nicNo: req.body.nicNo,
            salary: req.body.salary,
            userName: req.body.userName,
            password: bycryptedPassword,
            userData: req.body.userData,
        }

        const employee = new Employee(emp);
        employee.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllEmployeesDetails = async (req, res) => {       //get all employee details.
    await Employee.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedEmployeeDetails = async (req, res) => {          //get selected employee details.
    if (req.params && req.params.id) {
        await Employee.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getEmployeeDetails = async (req, res) => {       //get employee details 
    var userData = req.params.userData;
    await Employee.findOne({userData: userData})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });

}

const deleteEmployee = async (req, res) => {               // delete selected employee.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the employee
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);       //validating the employee id.
        await Employee.findByIdAndRemove(id);         // find employee and remove employee.
        res.json({message: "Employee deleted successfully."});
    }
}


module.exports = {
    createEmployee,
    getAllEmployeesDetails,
    getSelectedEmployeeDetails,
    deleteEmployee,
    getEmployeeDetails
};