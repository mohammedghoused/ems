import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data.content || response.data);
            })
            .catch((error) => {
                console.error("Backend connection error:", error);
            });
    };

    const addNewEmployee = () => {
        navigator('/add-employee');
    };

    const updateEmployee = (id) => {
        navigator(`/edit-employee/${id}`);
    };

    const removeEmployee = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id)
                .then((response) => {
                    getAllEmployees();
                })
                .catch((error) => {
                    console.error("Error deleting employee:", error);
                });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">List of Employees</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary" onClick={addNewEmployee}>
                    + Add New Employee
                </button>
            </div>
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email ID</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="align-middle">{employee.id}</td>
                                    <td className="align-middle">{employee.firstName}</td>
                                    <td className="align-middle">{employee.lastName}</td>
                                    <td className="align-middle">{employee.email}</td>
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-info btn-sm me-2 text-white" 
                                            onClick={() => updateEmployee(employee.id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => removeEmployee(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-muted">No Employees Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEmployeeComponent;