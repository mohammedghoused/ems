package com.ems.repository;

import com.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    // Derived query method: Spring Data JPA automatically builds
    // "SELECT * FROM employees WHERE email_id = ?" at runtime!
    Employee findByEmail(String email);
    boolean existsByEmail(String email);

}
