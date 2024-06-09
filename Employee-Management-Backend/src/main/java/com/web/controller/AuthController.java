package com.web.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.config.JwtProvider;
import com.web.model.Employee;
import com.web.model.USER_ROLE;
import com.web.model.User;
import com.web.repository.EmployeeRepository;
import com.web.repository.UserRepository;
import com.web.request.LoginRequest;
import com.web.response.AuthResponse;
import com.web.service.CustomUserServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired(required = true)
	private CustomUserServiceImpl customUserServiceImpl;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {

		User isEmailExist = userRepository.findUserByEmail(user.getEmail());
		if (isEmailExist != null) {
			throw new Exception("Email is already used with another account");
		}

		User createdUser = new User();
		createdUser.setFirstName(user.getFirstName());
		createdUser.setLastName(user.getLastName());
		createdUser.setEmail(user.getEmail());
		createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
		createdUser.setRole(user.getRole());
		User savedUser = userRepository.save(createdUser); 

		Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
				savedUser.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setMessage("Register Success........!");
		authResponse.setRole(savedUser.getRole());
		return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) {

		String username = req.getEmail();
		String password = req.getPassword();
		Authentication authentication = authenticate(username, password);
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
		String jwt = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setMessage("Login Success........!");
		authResponse.setRole(USER_ROLE.valueOf(role));
		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}

//	private Authentication authenticate(String username, String password) {
//		
//		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);
//		if (userDetails == null) {
//			throw new BadCredentialsException("Invalid username.......!");
//		}
//		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
//			throw new BadCredentialsException("Invalid password.......!");	
//		}
//		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//	}

	@PostMapping("/employee/signin")
	public ResponseEntity<AuthResponse> employeeSignin(@RequestBody Employee req) {
		String email = req.getEmail();
		String password = req.getPassword();
		logger.info("Attempting employee login for email: {}", email);

		Employee employee = employeeRepository.findByEmail(email);
		if (employee == null) {
			logger.error("Employee not found with email: {}", email);
			throw new BadCredentialsException("Invalid email or password");
		}

		logger.info("Employee found: {}", employee);
		if (!passwordEncoder.matches(password, employee.getPassword())) {
			logger.error("Password does not match for email: {}", email);
			throw new BadCredentialsException("Invalid email or password");
		}

		Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, null);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setMessage("Login Success........!");
		authResponse.setRole(USER_ROLE.ROLE_EMPLOYEE);
		authResponse.setId(employee.getId());
		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username.......!");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password.......!");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
