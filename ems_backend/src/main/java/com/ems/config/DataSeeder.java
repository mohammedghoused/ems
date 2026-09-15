package com.ems.config;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) throws Exception {
        long currentCount = employeeRepository.count();
        if (currentCount < 100) {
            System.out.println("Seeding dummy employees... Current count: " + currentCount);
            long needed = 100 - currentCount;
            List<Employee> dummyEmployees = new ArrayList<>();
            for (int i = 1; i <= needed; i++) {
                Employee emp = new Employee();
                emp.setFirstName("Employee");
                emp.setLastName(String.format("%03d", currentCount + i));
                emp.setEmail("employee" + (currentCount + i) + "@example.com");
                dummyEmployees.add(emp);
            }
            employeeRepository.saveAll(dummyEmployees);
            System.out.println("Finished seeding " + needed + " dummy employees.");
        }
    }
}
