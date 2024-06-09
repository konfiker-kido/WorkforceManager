package com.web.controller;

import java.time.Month;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Employee;
import com.web.model.Project;
import com.web.request.LoginRequest;
import com.web.service.EmployeeService;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/login")
	public ResponseEntity<Employee> loginHandler(@RequestBody LoginRequest request) throws Exception{
		Employee employee = employeeService.loginEmployee(request);
		return new ResponseEntity<Employee>(employee, HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id) throws Exception{
		Employee employee = employeeService.findEmployeeById(id);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}
	
	@GetMapping("/{id}/projects")
	public ResponseEntity<List<Project>> getProjectsByEmployeeId(@PathVariable Long id) throws Exception{
		List<Project> projects = employeeService.getProjectsByEmployeeId(id);
		return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
	}
	
	@GetMapping("/download/{employeeId}")
	public ResponseEntity<byte[]> downloadPayslip(@PathVariable Long employeeId, @RequestParam Month month) throws Exception {
        byte[] pdfBytes = employeeService.generatePayslip(employeeId, month);
        
        String filename = String.format("payslip_%s.pdf", month.toString());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+ filename)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
