package com.tavant.scrum_board.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tavant.scrum_board.models.ToDo;

@Repository
public interface ToDoRepositories extends JpaRepository<ToDo, String> {

	@Modifying(clearAutomatically = true)
	@Query(value = "delete from  to_do  WHERE to_do.user_id=:userid", nativeQuery = true)
	@Transactional
    public void deleteToDo(@Param("userid") String userid);
	
	@Modifying(clearAutomatically = true)
	@Query(value = "select t from to_do t WHERE t.user_id=:userid", nativeQuery = true)
	@Transactional
	public void findByDoTO(@Param("userid") String userid);
	
}
