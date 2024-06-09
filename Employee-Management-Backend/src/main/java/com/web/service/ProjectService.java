package com.web.service;

import java.util.List;
import java.util.Set;

import com.web.model.Employee;
import com.web.model.Project;

public interface ProjectService {

	public Project createProject(Project project, Long userId) throws Exception;

	public List<Project> findProjectsByUserId(Long userId);

	public List<Project> findAllProjects();

	public Project findProjectById(Long id) throws Exception;

	public String deleteProject(Long projectId, Long userId) throws Exception;

	public Project updateProject(Project project, Long id) throws Exception;

	public Set<Employee> getAllEMployees(Long projectId);

	public Project saveProject(Project project);

	public void addEmployeeToProject(Long projectId, String employeeEmail) throws Exception;

	public void removeUserFromProject(Long projectId, Long employeeId) throws Exception;
	
	public Project updateProjectStatus(Long projectId, String projectStatus) throws Exception;
}
