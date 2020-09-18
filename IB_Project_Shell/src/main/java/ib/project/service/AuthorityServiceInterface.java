package ib.project.service;

import java.util.List;

import ib.project.model.Authority;

public interface AuthorityServiceInterface {
	
	List<Authority> findById(Long id);
	List<Authority> findByname(String name);

}
