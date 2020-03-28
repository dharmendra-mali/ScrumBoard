package com.tavant.scrum_board.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyIntitializer", "handler" })
public class Task {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int taskid;
	
	private String notes;

	private String taskStatus;

	public Task() {

	}

	public String getNotes() {
		return notes;
	}

	public int getTaskid() {
		return taskid;
	}

	public void setTaskid(int taskid) {
		this.taskid = taskid;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}

	

}
