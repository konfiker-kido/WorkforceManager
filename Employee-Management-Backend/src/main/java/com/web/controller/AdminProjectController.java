package com.web.controller;

import java.util.List;

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
import com.web.service.ProjectService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/admin/projects")
public class AdminProjectController {

	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/create-project")
	public ResponseEntity<Project> createProject(@RequestBody Project project,
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		Project createProject = projectService.createProject(project, user.getId());
		return new ResponseEntity<>(createProject, HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Project> findProjectById(@PathVariable Long id) throws Exception{
		Project project = projectService.findProjectById(id);
		return new ResponseEntity<>(project, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Project>> getAllProjects(){
		List<Project> projects = projectService.findAllProjects();
		return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
	}
	
	@PostMapping("/{projectId}/add/{employeeEmail}")
	public ResponseEntity<String> addEmployeeToProject(@PathVariable Long projectId, 
			                  @PathVariable String employeeEmail) throws Exception{
		projectService.addEmployeeToProject(projectId, employeeEmail);
		return new ResponseEntity<String>("Employee added successfully.........!", HttpStatus.CREATED);
	}
	
	@PostMapping("/{projectId}/remove/{employeeId}")
	public ResponseEntity<String> removeEmployeeToProject(@PathVariable Long projectId, 
			                  @PathVariable Long employeeId) throws Exception{
		projectService.removeUserFromProject(projectId, employeeId);
		return new ResponseEntity<String>("Employee deleted successfully.........!", HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long projectId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		projectService.deleteProject(projectId, user.getId());
		return new ResponseEntity<String>("Project deleted successfully........!", HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Project> updateProject(@RequestBody Project project, @PathVariable Long id,
			                                       @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		Project updateProject = projectService.updateProject(project, id);
		return new ResponseEntity<>(updateProject, HttpStatus.ACCEPTED);
		
	}
	
	@PutMapping("/project/{projectId}/{projectStatus}")
	public ResponseEntity<Project> updateProjectStatus(@PathVariable Long projectId, 
			@PathVariable String projectStatus, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		Project project = projectService.updateProjectStatus(projectId, projectStatus);
		return new ResponseEntity<Project>(project, HttpStatus.ACCEPTED);
	}
}
