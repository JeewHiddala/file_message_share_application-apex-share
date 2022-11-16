const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');


module.exports = function () {
    router.post('/create', employeeController.createEmployee);        // create employees.
    router.get('/', employeeController.getAllEmployeesDetails);       //get all employees.
    router.get('/:id', employeeController.getSelectedEmployeeDetails);       //get selected employees details.
    router.get('/get-employee/:userData', employeeController.getEmployeeDetails);       //get employees.
    router.delete('/:id', employeeController.deleteEmployee);         //delete selected employees details.

    return router;
}