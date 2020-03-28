package com.tavant.scrum_board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tavant.scrum_board.models.User;
import com.tavant.scrum_board.service.UserService;
@CrossOrigin
@RestController
@RequestMapping("/user_api")
public class UserRestController {

	@Autowired
	private UserService userService;

	@GetMapping("/user")
	public List<User> userList() {
		return userService.userList();
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.OK)
	public void createUser(@RequestBody User user) {
		userService.createUser(user);
	}

	@GetMapping("/user/{userId}")
	public User getUser(@PathVariable("userId") String userId) {

		return userService.getUser(userId);
	}

	@DeleteMapping("/delete/{userId}")
	public void deleteuser(@PathVariable String userId) {
		
		userService.deleteuser(userId);
	}

	@PutMapping("/update/{userid}")
	public void updateUser(@RequestBody User user, @PathVariable(name = "userid") String userId) {
		user.setUserId(userId);
		
		userService.updateUser(user, userId);
	}
	
	@PostMapping("/validateUser")
	public User ckeckUser(@RequestBody User user){
		
		return userService.checkUser(user);
		
	}

}
