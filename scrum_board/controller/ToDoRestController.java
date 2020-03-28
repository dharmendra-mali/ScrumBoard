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

import com.tavant.scrum_board.models.ToDo;
import com.tavant.scrum_board.service.ToDoService;

@RestController
@RequestMapping("/todo_api")
@CrossOrigin
public class ToDoRestController {

	@Autowired
	private ToDoService toDoService;

	@GetMapping("/todo")
	public List<ToDo> taskList() {
		return toDoService.taskList();
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.OK)
	public void createTask(@RequestBody ToDo todo) {
		toDoService.createTask(todo);
	}

	@DeleteMapping("/delete/{userid}")
	public void deleteTask(@PathVariable("userid") String userid) {

		toDoService.deleteTask(userid);
	}

	@PutMapping("/update_todo")
	public void updateToDo(@RequestBody ToDo tempToDo) {

		toDoService.updateToDo(tempToDo);
	}

	@PutMapping("/updat_todo/{story}/{userId}")
	public void removeStory(@PathVariable String story, @PathVariable String userId) {
		
		toDoService.removeStory(story, userId);
	}
	@GetMapping("/todo/{userId}")
	public ToDo getOnToDo(@PathVariable String userId) {
		
		
		
		return toDoService.getOnToDo(userId);
	}
	
	
}
