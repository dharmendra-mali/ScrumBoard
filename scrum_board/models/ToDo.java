package com.tavant.scrum_board.models;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyIntitializer", "handler" })
public class ToDo {

	@Id
	private String userId;
	
	/*@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.PERSIST)
	@JoinColumn(name="userId")*/
	
	@Embedded
	@ElementCollection
	private List<ToDoHelper> toDoHelper;

	public ToDo() {

	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<ToDoHelper> getToDoHelper() {
		return toDoHelper;
	}

	public void setToDoHelper(List<ToDoHelper> toDoHelper) {
		this.toDoHelper = toDoHelper;
	}

}
