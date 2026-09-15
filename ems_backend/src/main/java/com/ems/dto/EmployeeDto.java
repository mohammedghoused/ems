package com.ems.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private Long id;
    @NotBlank(message = "Employee first name should not be null or empty")
    @Size(min = 2, message = "First name should have at least 2 characters")
    private String firstName;

    @NotBlank(message = "Employee last name should not be null or empty")
    private String lastName;

    @NotBlank(message = "Employee email should not be null or empty")
    @Email(message = "Email address should be valid")
    private String email;
}
