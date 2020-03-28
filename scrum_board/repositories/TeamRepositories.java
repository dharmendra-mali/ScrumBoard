package com.tavant.scrum_board.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tavant.scrum_board.models.Team;

public interface TeamRepositories extends JpaRepository<Team, String> {

	public Team findByTeamName(String teamName);

	@Modifying(clearAutomatically = true)
	@Query(value = "delete from team  WHERE team.teamName=:teamName", nativeQuery = true)
	@Transactional
	public void deleteByTeam(@Param("teamName") String teamName);

}
