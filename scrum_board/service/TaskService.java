package com.tavant.scrum_board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tavant.scrum_board.models.Scrum;
import com.tavant.scrum_board.models.Task;
import com.tavant.scrum_board.repositories.ScrumRepositories;
import com.tavant.scrum_board.repositories.TaskRepositories;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepositories taskRepositories;

	@Autowired
	private ScrumRepositories scrumRepository;

	
	public List<Task> taskList() {
		return taskRepositories.findAll();
	}


	public void createTask(Task task) {
		taskRepositories.save(task);
	}

	public Task getTask(String notes) {

		return taskRepositories.findByNotes(notes);

	}

	public void deleteTask(int taskId) {
		taskRepositories.deleteById(taskId);

	}

	public void assignTaskToUser(String notes, String userId) {
		taskRepositories.assignTask(notes, userId);

	}

	public void deleteTaskToUser(String notes) {
		taskRepositories.deleteTask(notes);

	}

	public void updateStatus(String notes, String scrumName, String userId) {

		Scrum scrum = scrumRepository.findById(scrumName).get();
		List<Task> tasks = scrum.getTasks();
		for (Task task : tasks) {
			if (task.getNotes().equals(notes)) {
				task.setTaskStatus(userId);
				taskRepositories.save(task);
			}
		}

	}

	public void removeStatus(String notes,String scrumName) {

		Scrum scrum = scrumRepository.findById(scrumName).get();
		List<Task> tasks = scrum.getTasks();
		for (Task task : tasks) {
			if (task.getNotes().equals(notes)) {
				task.setTaskStatus("NONE");
				taskRepositories.save(task);
			}
		}

	}

}
