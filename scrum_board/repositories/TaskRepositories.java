package com.tavant.scrum_board.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tavant.scrum_board.models.Task;

public interface TaskRepositories extends JpaRepository<Task, Integer> {

	public Task findByNotes(String notes);
	
	@Modifying(clearAutomatically = true)
	@Query(value = "delete from  task  WHERE task.notes=:notes", nativeQuery = true)
	@Transactional
	public void deletenotes(@Param("notes") String notes);
	
	
	@Modifying(clearAutomatically = true)
	@Query(value = "UPDATE task  SET task.user_id=:userid WHERE task.notes=:notes", nativeQuery = true)
	@Transactional
	public void assignTask(@Param("notes") String notes,@Param("userid") String userId);
	
	@Modifying(clearAutomatically = true)
	@Query(value = "UPDATE task  SET task.user_id=NULL WHERE task.notes=:notes", nativeQuery = true)
	@Transactional
	public void deleteTask(@Param("notes") String notes);
	
	
	
	
	
}
