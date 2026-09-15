package com.ems.service.impl;

import com.ems.dto.EmployeeDto;
import com.ems.dto.EmployeeResponse;
import com.ems.entity.Employee;
import com.ems.exception.ResourceAlreadyExistsException;
import com.ems.exception.ResourceNotFoundException;
import com.ems.mapper.EmployeeMapper;
import com.ems.repository.EmployeeRepository;
import com.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto){

        // 1. Proactive Business Validation Check
        if (employeeRepository.existsByEmail(employeeDto.getEmail())) {
            throw new ResourceAlreadyExistsException("Employee already exists with given email: " + employeeDto.getEmail());
        }
        // 1. Convert incoming DTO to Entity
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        // 2. Save entity into Database using Repository
        Employee savedEmployee = employeeRepository.save(employee);

        // 3. Convert saved Entity back to DTO and return
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }
    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId));

        employeeRepository.deleteById(employeeId);
    }

    @Override
    public EmployeeResponse getAllEmployeesPaginated(int pageNo, int pageSize, String sortBy, String sortDir) {

        // 1. Validate and Configure Sorting
        List<String> allowedSortFields = List.of("id", "firstName", "lastName", "email");
        if (sortBy == null || !allowedSortFields.contains(sortBy)) {
            sortBy = "id"; // Default to id if invalid
        }

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        // 2. Create Pageable Instance (Note: Spring Data JPA pages are 0-indexed!)
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        // 3. Query Database (JpaRepository automatically executes paginated SQL with LIMIT & OFFSET)
        Page<Employee> employeePage = employeeRepository.findAll(pageable);

        // 4. Map Entities to DTOs
        List<Employee> listOfEmployees = employeePage.getContent();
        List<EmployeeDto> content = listOfEmployees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());

        // 5. Construct and Return Paginated Response
        EmployeeResponse employeeResponse = new EmployeeResponse();
        employeeResponse.setContent(content);
        employeeResponse.setPageNo(employeePage.getNumber());
        employeeResponse.setPageSize(employeePage.getSize());
        employeeResponse.setTotalElements(employeePage.getTotalElements());
        employeeResponse.setTotalPages(employeePage.getTotalPages());
        employeeResponse.setLast(employeePage.isLast());

        return employeeResponse;
    }
}
