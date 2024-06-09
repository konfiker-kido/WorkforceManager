package com.web.service;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.time.Month;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.web.model.Employee;
import com.web.model.Project;
import com.web.model.USER_ROLE;
import com.web.model.User;
import com.web.repository.EmployeeRepository;
import com.web.repository.ProjectRepository;
import com.web.request.LoginRequest;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public String generatePassword() {
		String password = UUID.randomUUID().toString();
		return password.substring(0, Math.min(password.length(), 5));
	}

	@Override
	public Employee createEmployee(Employee employee, Long userId) throws Exception {
		User user = userService.findUserById(userId);
//		Project project =projectService.findProjectById(projectId);

		Employee createEmployee = new Employee();
		createEmployee.setName(employee.getName());
		createEmployee.setEmail(employee.getEmail());
		createEmployee.setPassword(passwordEncoder.encode(employee.getPassword()));
		createEmployee.setMobileNo(employee.getMobileNo());
		createEmployee.setAdhaar(employee.getAdhaar());
		createEmployee.setPanNo(employee.getPanNo());
		createEmployee.setGender(employee.getGender());
		createEmployee.setDateOfBirth(employee.getDateOfBirth());
		createEmployee.setBankName(employee.getBankName());
		createEmployee.setAccountNumber(employee.getAccountNumber());
		createEmployee.setIfscCode(employee.getIfscCode());
		createEmployee.setAddress(employee.getAddress());
		createEmployee.setCity(employee.getCity());
		createEmployee.setState(employee.getState());
		createEmployee.setEmpId(generatePassword());
		createEmployee.setCompanyName(employee.getCompanyName());
		createEmployee.setCompanyLocation(employee.getCompanyLocation());
		createEmployee.setExperience(employee.getExperience());
		createEmployee.setCategory(employee.getCategory());
		createEmployee.setSalary(employee.getSalary());
		createEmployee.setRole(USER_ROLE.ROLE_EMPLOYEE);
		createEmployee.setUser(user);
//		createEmployee.setStatus(true);

//		createEmployee.setProject(project);
		Employee savedEmployee = employeeRepository.save(createEmployee);
//		savedEmployee.getProjects().add(project);
//		project.getEmployees().add(savedEmployee);
//		projectService.saveProject(project);

		return savedEmployee;
	}

	public void addEmployeeToProject(Long employeeId, Long projectId) {
		Employee employee = employeeRepository.findById(employeeId).orElse(null);
		Project project = projectRepository.findById(projectId).orElse(null);

		if (employee != null && project != null) {
//			employee.getProjects().add(project);
			project.getEmployees().add(employee);
			employeeRepository.save(employee);
			projectRepository.save(project);
		} else {

		}
	}

	@Override
	public Set<Employee> findEmployeeByUserId(Long userId) throws Exception {
		Set<Employee> employees = employeeRepository.findEmployeesByUserId(userId);
		return employees;
	}

	@Override
	public Employee findEmployeeByEmail(String email) throws Exception {
		Employee employee = employeeRepository.findByEmail(email);
		if (employee == null) {
			throw new Exception("Employee not found with email " + email);
		}
		return employee;
	}

	@Override
	public List<Employee> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees;
	}

	@Override
	public String deleteEmployee(Long employeeId, Long userId) throws Exception {
		User user = userService.findUserById(userId);
		Employee employee = findEmployeeById(employeeId);
		if (employee.getUser().getId() != user.getId()) {
			throw new Exception("You can't delete another admin employee");
		}
		employeeRepository.delete(employee);
		return "Employee deleted successfully............!";
	}

	@Override
	public Employee findEmployeeById(Long id) throws Exception {
		Optional<Employee> employee = employeeRepository.findById(id);
		if (employee.isEmpty()) {
			throw new Exception("Employee not found with id " + id);
		}
		return employee.get();
	}

	@Override
	public Employee updateEmployee(Employee employee, Long id) throws Exception {
		Optional<Employee> optEmployee = employeeRepository.findById(id);
		if (optEmployee.isEmpty()) {
			throw new Exception("Employee not found with id " + id);
		}
		Employee newEmployee = optEmployee.get();
		newEmployee.setName(employee.getName());
		newEmployee.setEmail(employee.getEmail());
		newEmployee.setPassword(passwordEncoder.encode(employee.getPassword()));
		newEmployee.setMobileNo(employee.getMobileNo());

		Employee updateEmployee = employeeRepository.save(newEmployee);
		return updateEmployee;
	}

	@Override
	public Employee loginEmployee(LoginRequest request) throws Exception {
		Employee employee = findEmployeeByEmail(request.getEmail());
		if (employee == null) {
			throw new Exception("Employee not found with email " + request.getEmail());
		}
		if (!employee.getPassword().equals(request.getPassword())) {
			throw new Exception("Password is incorrect........!");
		}

		return employee;
	}

	@Override
	public List<Project> getProjectsByEmployeeId(Long employeeId) throws Exception {
		Employee employee = findEmployeeById(employeeId);
		return employee.getProjects();
	}

	@Override
	public byte[] generatePayslip(Long employeeId, Month month) throws FileNotFoundException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // Add content to the PDF
        document.add(new Paragraph("Payslip for Employee ID: " + employeeId));
        document.add(new Paragraph("Salary: $5000"));
        document.add(new Paragraph("Deductions: $500"));
        document.add(new Paragraph("Net Pay: $4500"));

        document.add(new Paragraph("Month: "+ month));
        document.close();

        return baos.toByteArray();
		
	}

}
