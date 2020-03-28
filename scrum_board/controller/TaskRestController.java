package com.tavant.scrum_board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tavant.scrum_board.models.Task;
import com.tavant.scrum_board.service.TaskService;

@RestController
@RequestMapping("/task_api")
@CrossOrigin
public class TaskRestController {

	@Autowired
	private TaskService taskService;
	
	@GetMapping("/task")
	public List<Task> taskList() {
		return taskService.taskList();
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.OK)
	public void createTask(@RequestBody Task task) {
		taskService.createTask(task);
	}

	@GetMapping("/task/{notes}")
	public Task getTask(@PathVariable("notes") String notes) {

		return taskService.getTask(notes);

	}

	@DeleteMapping("/delete/{notes}")
	public void deleteTask(@PathVariable("notes") int taskId) {
		taskService.deleteTask(taskId);

	}

	@PutMapping("/assign_task/{notes}/{userid}")
	public void assignTaskToUser(@PathVariable("notes") String notes, @PathVariable("userid") String userId) {
		taskService.assignTaskToUser(notes, userId);

	}

	@PutMapping("/delete_task/{notes}")
	public void deleteTaskToUser(@PathVariable("notes") String notes) {
		taskService.deleteTaskToUser(notes);

	}

	@PutMapping("/update_status/{notes}/{scrumName}/{userId}")
	public void updateStatus(@PathVariable String notes, @PathVariable String scrumName, @PathVariable String userId) {

		taskService.updateStatus(notes, scrumName, userId);
	}

	@PutMapping("remove_status/{notes}/{scrumName}")
	public void removeStatus(@PathVariable String notes, @PathVariable String scrumName) {

		taskService.removeStatus(notes, scrumName);
	}

}
