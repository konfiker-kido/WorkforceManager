package com.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{

	List<Project> findProjectsByUserId(Long userId);
	
	
}
