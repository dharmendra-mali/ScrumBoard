package com.tavant.scrum_board.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tavant.scrum_board.models.Scrum;

@Repository
public interface ScrumRepositories extends JpaRepository<Scrum, String> {

	public Scrum findByScrumName(String scrumName);

	@Modifying(clearAutomatically = true)
	@Query(value = "delete from scrum where scrum_name=:scrumName", nativeQuery = true)
	@Transactional
	public void deleteByScrumName(String scrumName);

}
