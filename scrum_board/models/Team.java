package com.tavant.scrum_board.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyIntitializer", "handler" })
public class Team {

	@Id
	private String teamName;

	@OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH})
	@JoinColumn(name = "userTeamName")
	private List<User> teamUsers;
	
	public Team() {

	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public List<User> getTeamUsers() {
		return teamUsers;
	}

	public void setTeamUsers(List<User> teamUsers) {
		this.teamUsers = teamUsers;
	}

	// add addUser method to update team object
	public void addUser(User tempUser) {

		if (teamUsers == null) {
			teamUsers = new ArrayList<User>();
		}
		teamUsers.add(tempUser);

	}

}
