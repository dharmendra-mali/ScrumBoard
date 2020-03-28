package com.tavant.scrum_board.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyIntitializer", "handler" })
public class Scrum {

	@Id
	private String scrumName;

	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "teamName")
	private Team team;

	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="scrumName")
	private List<Task> tasks;

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public Scrum() {

	}

	public String getScrumName() {
		return scrumName;
	}

	public void setScrumName(String scrumName) {
		this.scrumName = scrumName;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}
	public void addUser(Task  temptask) {

		if (tasks == null) {
			tasks = new ArrayList<Task>();
		}
		tasks.add(temptask);

	}

}
