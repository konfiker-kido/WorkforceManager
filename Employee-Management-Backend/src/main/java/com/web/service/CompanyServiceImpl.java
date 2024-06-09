//package com.web.service;
//
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.web.model.Company;
//import com.web.model.User;
//import com.web.repository.CompanyRepository;
//
//@Service
//public class CompanyServiceImpl implements CompanyService{
//
//	@Autowired
//	private CompanyRepository companyRepository;
//	
//	@Autowired
//	private UserService userService;
//	
//	@Override
//	public Company createCompany(Company company, Long userId) throws Exception {
//		User user = userService.findUserById(userId);
//		
//		Company createCompany = new Company();
//		createCompany.setName(company.getName());
//		createCompany.setLocation(company.getLocation());
//		createCompany.setDepartments(company.getDepartments());
//		createCompany.setIndustry(company.getIndustry());
//		createCompany.setWebsite(company.getWebsite());
//		createCompany.setCreatedAt(new Date());
//		createCompany.setUser(user);
////		createCompany.setProjects(user.getProjects());
////		createCompany.setEmployees(user.getEmployees());
//		
//		Company savedCompany = companyRepository.save(createCompany);
//		return savedCompany;
//	}
//
//	@Override
//	public List<Company> findCompanyByUserId(Long userId) throws Exception {
//		List<Company> companies = companyRepository.findCompaniesByUserId(userId);
//		return companies;
//	}
//
//	@Override
//	public List<Company> getAllCompanies() {
//		List<Company> companies = companyRepository.findAll();
//		return companies;
//	}
//
//	@Override
//	public String deleteCompany(Long companyId, Long userId) throws Exception {
//		User user = userService.findUserById(userId);
//		Company company = findCompanyById(companyId);
//		if(company.getUser().getId() != user.getId()) {
//			throw new Exception("You can't delete another admin company........!");
//		}
//		companyRepository.delete(company);
//		return "Company deleted successfully with id "+companyId;
//	}
//
//	@Override
//	public Company findCompanyById(Long id) throws Exception {
//		Optional<Company> company = companyRepository.findById(id);
//		if(company.isEmpty()) {
//			throw new Exception("Company not found with id "+id);
//		}
//		return company.get();
//	}
//
//	@Override
//	public Company updateCompany(Company company, Long id) throws Exception {
//		Optional<Company> optCompany = companyRepository.findById(id);
//		if(optCompany.isEmpty()) {
//			throw new Exception("Company not found with id "+id);
//		}
//		Company newCompany = optCompany.get();
//		newCompany.setName(company.getName());
//		newCompany.setDepartments(company.getDepartments());
//		newCompany.setLocation(company.getLocation());
//		newCompany.setIndustry(company.getIndustry());
//		
//		Company updatedCompany = companyRepository.save(newCompany);
//		return updatedCompany;
//	}
//
//}
