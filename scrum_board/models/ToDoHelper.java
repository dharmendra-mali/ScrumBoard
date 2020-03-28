package com.tavant.scrum_board.models;

import javax.persistence.Embeddable;

@Embeddable
public class ToDoHelper {

//	@Id
//	@GeneratedValue(strategy=GenerationType.AUTO)
//	private String id;
	private String story;
	private String status;
	public String getStory() {
		return story;
	}
	public void setStory(String story) {
		this.story = story;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
