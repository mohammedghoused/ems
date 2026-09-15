package com.ems.service;

import com.ems.dto.EmployeeDto;
import com.ems.dto.EmployeeResponse;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);
    void deleteEmployee(Long employeeId);
    EmployeeResponse getAllEmployeesPaginated(int pageNo, int pageSize, String sortBy, String sortDir);
}
