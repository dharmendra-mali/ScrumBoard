package com.tavant.scrum_board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tavant.scrum_board.models.Scrum;
import com.tavant.scrum_board.models.Team;
import com.tavant.scrum_board.models.User;
import com.tavant.scrum_board.repositories.ScrumRepositories;
import com.tavant.scrum_board.repositories.TeamRepositories;
import com.tavant.scrum_board.repositories.UserRepositories;

@Service
public class TeamService {

	@Autowired
	private TeamRepositories teamRepositories;
	@Autowired
	private UserRepositories userRepositories;
		
	@Autowired
	private ScrumRepositories scrumRepositories;

	public List<Team> teamList() {
		return teamRepositories.findAll();
	}

	public void createTeam(Team team) {
		teamRepositories.save(team);
	}

	public Team getTeam(String teamId) {

		return teamRepositories.findByTeamName(teamId);

	}

	public void deleteTeam(String teamName) {


		List<Scrum> scrums = scrumRepositories.findAll();
		Team team = teamRepositories.findById("NONE").get();
		for(int i=0; i<scrums.size();i++) {
			if(scrums.get(i).getTeam().getTeamName().equals(teamName)) {
				scrums.get(i).setTeam(team);
				scrumRepositories.save(scrums.get(i));
					break;
			}
		}
		Team tempTeam = teamRepositories.findByTeamName(teamName);
		teamRepositories.delete(tempTeam);
		List<User> list = tempTeam.getTeamUsers();
		for (User tempUser : list) {
			userRepositories.deleteAssignUserId(tempUser.getUserId());
		}
		
	}

	public void createTeamUser(String teamName, String userId) {

		Team tempteam = teamRepositories.findByTeamName(teamName);
		User tempUser = userRepositories.findByUserId(userId);
		tempteam.addUser(tempUser);
		teamRepositories.save(tempteam);

	}


	public void createTeamUsers(String teamName,String[] userArray) {

		Team tempteam = teamRepositories.findByTeamName(teamName);

		for (String integer : userArray) {

			User tempUser = userRepositories.findByUserId(integer);
			tempteam.addUser(tempUser);
		}

		teamRepositories.save(tempteam);

	}

	public void addUserTOTeam(Team tempTeam) {

		Team local = teamRepositories.findByTeamName(tempTeam.getTeamName());
		teamRepositories.delete(local);
		
		local.addUser(tempTeam.getTeamUsers().get(0));
//		List<User> users = local.getTeamUsers();
		
		teamRepositories.save(local);

	}

	public void deleteTeamUser(Team tempTeam) {

		User user = tempTeam.getTeamUsers().get(0);

		userRepositories.delete(user);
		user.setUserTeamName("NONE");
		userRepositories.save(user);

	}
}
