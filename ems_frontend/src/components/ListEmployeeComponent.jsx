import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    
    // Pagination and sorting state
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [pageNo, pageSize, sortBy, sortDir]);

    const getAllEmployees = () => {
        listEmployees(pageNo, pageSize, sortBy, sortDir)
            .then((response) => {
                const data = response.data;
                if (data.content !== undefined) { // paginated response
                    setEmployees(data.content);
                    setTotalPages(data.totalPages);
                    setTotalElements(data.totalElements);
                } else { // fallback if API returns flat list
                    setEmployees(data);
                    setTotalPages(1);
                    setTotalElements(data.length);
                }
            })
            .catch((error) => {
                console.error("Backend connection error:", error);
            });
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDir('asc');
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNo(0); // Reset to page 0 when page size changes
    };

    const handlePreviousPage = () => {
        if (pageNo > 0) setPageNo(pageNo - 1);
    };

    const handleNextPage = () => {
        if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
    };

    const getSortIndicator = (field) => {
        if (sortBy === field) {
            return sortDir === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
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
                    // Check if we just deleted the last item on the page
                    if (employees.length === 1 && pageNo > 0) {
                        setPageNo(pageNo - 1);
                    } else {
                        getAllEmployees();
                    }
                })
                .catch((error) => {
                    console.error("Error deleting employee:", error);
                });
        }
    };

    const startElement = pageNo * pageSize + 1;
    const endElement = Math.min((pageNo + 1) * pageSize, totalElements);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">List of Employees</h2>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-primary" onClick={addNewEmployee}>
                    + Add New Employee
                </button>
                <div className="d-flex align-items-center">
                    <label className="me-2 fw-bold text-nowrap">Employees per page:</label>
                    <select className="form-select form-select-sm" style={{ width: 'auto' }} value={pageSize} onChange={handlePageSizeChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th style={{cursor: 'pointer'}} onClick={() => handleSort('id')}>Employee ID{getSortIndicator('id')}</th>
                            <th style={{cursor: 'pointer'}} onClick={() => handleSort('firstName')}>First Name{getSortIndicator('firstName')}</th>
                            <th style={{cursor: 'pointer'}} onClick={() => handleSort('lastName')}>Last Name{getSortIndicator('lastName')}</th>
                            <th style={{cursor: 'pointer'}} onClick={() => handleSort('email')}>Email ID{getSortIndicator('email')}</th>
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

            {totalElements > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                    <span className="text-muted mb-2">
                        Showing {startElement} to {endElement} of {totalElements} employees
                    </span>
                    <nav>
                        <ul className="pagination mb-0">
                            <li className={`page-item ${pageNo === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                            </li>
                            
                            {[...Array(totalPages)].map((_, index) => {
                                // Simple pagination logic for clean UI
                                if (totalPages > 7) {
                                    if (index !== 0 && index !== totalPages - 1 && Math.abs(pageNo - index) > 2) {
                                        if (index === 1 || index === totalPages - 2) return <li key={index} className="page-item disabled"><span className="page-link">...</span></li>;
                                        return null;
                                    }
                                }
                                return (
                                    <li key={index} className={`page-item ${pageNo === index ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setPageNo(index)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                );
                            })}

                            <li className={`page-item ${pageNo >= totalPages - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handleNextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default ListEmployeeComponent;