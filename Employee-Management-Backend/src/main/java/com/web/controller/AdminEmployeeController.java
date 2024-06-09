package com.web.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Employee;
import com.web.model.Project;
import com.web.model.User;
import com.web.service.EmployeeService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/admin/employees")
public class AdminEmployeeController {

	@Autowired 
	private EmployeeService employeeService;
	
	@Autowired 
	private UserService userService;
	
	@PostMapping("/employee")
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee,
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		Employee createEmployee = employeeService.createEmployee(employee, user.getId());
		return new ResponseEntity<>(createEmployee, HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Employee>> findAllEmployees(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		List<Employee> getAllEmployees = employeeService.getAllEmployees();
		return new ResponseEntity<>(getAllEmployees, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		employeeService.deleteEmployee(employeeId, user.getId());
		return new ResponseEntity<String>("Employee deleted successfully........!", HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee, @PathVariable Long id,
			                                       @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		Employee updateEmployee = employeeService.updateEmployee(employee, id);
		return new ResponseEntity<>(updateEmployee, HttpStatus.ACCEPTED);
		
	}
	
	
	
	
	
	@GetMapping("/email/{email}")
	public ResponseEntity<Employee> findEmployeeByEmail(@PathVariable String email) throws Exception{
		Employee employee = employeeService.findEmployeeByEmail(email);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id) throws Exception{
		Employee employee = employeeService.findEmployeeById(id);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}
}
