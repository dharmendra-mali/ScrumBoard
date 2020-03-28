package com.tavant.scrum_board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tavant.scrum_board.models.Scrum;
import com.tavant.scrum_board.models.Task;
import com.tavant.scrum_board.models.ToDo;
import com.tavant.scrum_board.models.ToDoHelper;
import com.tavant.scrum_board.models.User;
import com.tavant.scrum_board.repositories.ScrumRepositories;
import com.tavant.scrum_board.repositories.TaskRepositories;
import com.tavant.scrum_board.repositories.ToDoRepositories;

@Service
public class ScrumService {

	@Autowired
	private ScrumRepositories scrumRepositories;

	@Autowired
	private TaskRepositories taskRepositories;

	@Autowired
	private ToDoRepositories toDoRepositories;

	public List<Scrum> scrumList() {
		return scrumRepositories.findAll();
	}

	public void createtScrum(Scrum scrum) {
		scrumRepositories.save(scrum);
	}

	public Scrum getTeam(String scrumName) {

		return scrumRepositories.findByScrumName(scrumName);

	}

	public void deleteTeam(String scrumName) {

		Scrum tempScrum = scrumRepositories.findByScrumName(scrumName);
		List<User> listUser = tempScrum.getTeam().getTeamUsers();
		List<Task> scrumTasks = tempScrum.getTasks();
		int length = scrumTasks.size();
		int[] tasksId = new int[100];
		int j = 0;
		for (Task task : scrumTasks) {

			tasksId[j] = task.getTaskid();
			j++;

		}
		scrumRepositories.deleteByScrumName(scrumName);

		for (int i = length - 1; i >= 0; i--) {

			taskRepositories.deleteById(tasksId[i]);
		}
             
		for (int k = 0; k < listUser.size(); k++) {

		ToDo temp=	toDoRepositories.findById(listUser.get(k).getUserId()).get();
		List<ToDoHelper> listOfToDoHelper=temp.getToDoHelper();
		final int len = listOfToDoHelper.size();
			for(int l=len-1;l>=0;l--) {
				temp.getToDoHelper().remove(temp.getToDoHelper().get(l));
			}
			
			toDoRepositories.save(temp);
		}

	}

	public void updateScrum(Scrum tempScrum) {

		Scrum oldScrum = scrumRepositories.findById(tempScrum.getScrumName()).get();
		scrumRepositories.delete(oldScrum);
		for (Task task : oldScrum.getTasks()) {
			taskRepositories.delete(task);
		}
		for (int i = 0; i < oldScrum.getTasks().size(); i++) {
			for (int j = 0; j < tempScrum.getTasks().size(); j++) {

				if (oldScrum.getTasks().get(i).getNotes().equals(tempScrum.getTasks().get(j).getNotes())) {
					tempScrum.getTasks().get(j).setTaskStatus(oldScrum.getTasks().get(i).getTaskStatus());
				}
			}
		}

		scrumRepositories.save(tempScrum);
	}

	public void deAssignTask(String story, String scrumName) {

		Scrum sc = scrumRepositories.findById(scrumName).get();
		scrumRepositories.delete(sc);
		for (int i = 0; i < sc.getTasks().size(); i++) {
			if (sc.getTasks().get(i).getNotes().equals(story)) {
				sc.getTasks().remove(i);
			}
		}

		scrumRepositories.save(sc);

	}
}
