package com.tavant.scrum_board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tavant.scrum_board.models.ToDo;
import com.tavant.scrum_board.models.ToDoHelper;
import com.tavant.scrum_board.repositories.ToDoRepositories;

@Service
public class ToDoService {

	@Autowired
	private ToDoRepositories toDoRepositories;

	public List<ToDo> taskList() {
		return toDoRepositories.findAll();
	}

	public void createTask(ToDo todo) {
		toDoRepositories.save(todo);
	}

	public void deleteTask(String userid) {

		toDoRepositories.deleteToDo(userid);

	}

	public void updateToDo(ToDo tempToDo) {

		toDoRepositories.save(tempToDo);
	}

	public void removeStory(String story, String userId) {

		ToDo toDo = toDoRepositories.findById(userId).get();
		List<ToDoHelper> toDoHelper = toDo.getToDoHelper();
		;

		for (int i = 0; i < toDoHelper.size(); i++) {
			if (story.equals(toDoHelper.get(i).getStory())) {
				toDo.getToDoHelper().remove(i);

			}
		}
		toDoRepositories.save(toDo);
	}

	public ToDo getOnToDo(String userId) {

		return toDoRepositories.findById(userId).get();
		
	}

}
