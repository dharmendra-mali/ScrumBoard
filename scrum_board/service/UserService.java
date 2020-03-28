package com.tavant.scrum_board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tavant.scrum_board.models.User;
import com.tavant.scrum_board.repositories.UserRepositories;

@Service
public class UserService {

	@Autowired
	private UserRepositories userRepositories;

	public List<User> userList() {
		return userRepositories.findAll();
	}

	public void createUser(User user) {
		userRepositories.save(user);
	}

	public User getUser(String userId) {

		return userRepositories.findById(userId).get();

	}

	public void deleteuser(String userId) {
		userRepositories.deleteById(userId);

	}

	public void updateUser(User user, String userId) {
		user.setUserId(userId);
		userRepositories.save(user);

	}

	public User checkUser(User user) {
		
		try {
			System.out.println("gettingdata " +user.getUserEmail());
			User tempUser = userRepositories.findByUserEmail(user.getUserEmail());
			System.out.println(tempUser.getUserDesignation());
			if (tempUser.getUserEmail().equals(user.getUserEmail()) && tempUser.getPassword().equals(user.getPassword())) {

				return tempUser;
			} else {
				User local = new User();
				local.setUserDesignation("null");
				return local;
			}
		} catch(Exception e) {
			User local = new User();
			local.setUserDesignation("null");
			return local;
		}
	}
}
