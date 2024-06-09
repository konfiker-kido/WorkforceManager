package com.web.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.web.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	Employee findByEmail(String email);
	
	Set<Employee> findEmployeesByUserId(Long userId);
	
//	@Query("SELECT e FROM Employee e JOIN e.projects p WHERE p.id = :projectId")
//	Employee findEmployeeByProjectId(Long projectId);
}
