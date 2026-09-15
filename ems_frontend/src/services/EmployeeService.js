import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Fetch all employees with pagination & sorting
export const listEmployees = (pageNo = 0, pageSize = 10, sortBy = 'id', sortDir = 'asc') => 
    axios.get(`${REST_API_BASE_URL}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);

// Create a new employee
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

// Get single employee by ID
export const getEmployee = (employeeId) => axios.get(`${REST_API_BASE_URL}/${employeeId}`);

// Update employee
export const updateEmployee = (employeeId, employee) => axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee);

// Delete employee
export const deleteEmployee = (employeeId) => axios.delete(`${REST_API_BASE_URL}/${employeeId}`);

