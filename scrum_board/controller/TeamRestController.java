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

import com.tavant.scrum_board.models.Team;
import com.tavant.scrum_board.service.TeamService;

@RestController
@RequestMapping("/team_api")
@CrossOrigin
public class TeamRestController {

	@Autowired
	private TeamService teamService;

	@GetMapping("/team")
	public List<Team> teamList() {
		return teamService.teamList();
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.OK)
	public void createTeam(@RequestBody Team team) {
		teamService.createTeam(team);
	}

	@GetMapping("/team/{teamid}")
	public Team getTeam(@PathVariable("teamid") String teamId) {

		return teamService.getTeam(teamId);
	}

	// write a method to go update user table
	@DeleteMapping("/delete/{teamName}")
	public void deleteTeam(@PathVariable String teamName) {
		
		teamService.deleteTeam(teamName);
	}

	@PutMapping("/save_user/{teamName}/{userid}")
	public void createTeamUser(@PathVariable(name = "teamName") String teamName,
			@PathVariable(name = "userid") String userId) {
		teamService.createTeamUser(teamName, userId);
	}

	@PutMapping("/save_users/{teamName}")
	public void createTeamUsers(@PathVariable(name = "teamName") String teamName, @RequestBody String[] userArray) {

		teamService.createTeamUsers(teamName, userArray);
	}

	@PutMapping("addUserToTeam")
	public void addUserTOTeam(@RequestBody Team tempTeam) {

		teamService.addUserTOTeam(tempTeam);
	}

	@PutMapping("/delete_user")
	public void deleteTeamUser(@RequestBody Team tempTeam) {

		teamService.deleteTeamUser(tempTeam);
	}

}
