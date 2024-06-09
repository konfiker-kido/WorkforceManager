package com.web.service;

import java.time.Month;
import java.util.List;
import java.util.Set;

import com.web.model.Employee;
import com.web.model.Project;
import com.web.request.LoginRequest;

public interface EmployeeService {

	public Employee createEmployee(Employee employee, Long userId) throws Exception;
	
	public Set<Employee> findEmployeeByUserId(Long userId) throws Exception;
	
	public Employee findEmployeeByEmail(String email) throws Exception;
	
	public List<Employee> getAllEmployees();
	
	public String deleteEmployee(Long employeeId, Long userId) throws Exception;
	
	public Employee findEmployeeById(Long id) throws Exception;
	
	public Employee updateEmployee(Employee employee, Long id) throws Exception;
	
	public Employee loginEmployee(LoginRequest request) throws Exception;
	
	public List<Project> getProjectsByEmployeeId(Long employeeId) throws Exception;
	
	public byte[] generatePayslip(Long employeeId, Month month) throws Exception;
}
