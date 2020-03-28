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

import com.tavant.scrum_board.models.Scrum;
import com.tavant.scrum_board.service.ScrumService;

@RestController
@RequestMapping("/scrum_api")
@CrossOrigin
public class ScrumRestController {

	@Autowired
	private ScrumService scrumService;
	
	@GetMapping("/scrum")
	private List<Scrum> getScrum() {
		List<Scrum> list=null;
		try {
		list = scrumService.scrumList();
		}catch(Exception e) {
			System.err.println("getting exception while retriving data");
		}
		return list;
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.OK)
	public void createtScrum(@RequestBody Scrum scrum) {
	
		scrumService.createtScrum(scrum);
	}

	@GetMapping("/scrum/{scrumname}")
	public Scrum getTeam(@PathVariable("scrumname") String scrumName) {

		return scrumService.getTeam(scrumName);

	}
	
	@DeleteMapping("/delete/{scrumname}")
    public void deleteTeam(@PathVariable("scrumname") String scrumName) {
        scrumService.deleteTeam(scrumName);
    }


	
	@PutMapping("update_scrum")
	public void updateScrum(@RequestBody Scrum tempScrum) {

		scrumService.updateScrum(tempScrum);
	}

	@PutMapping("/release/{story}/{scrumName}")
	public void deAssignTask(@PathVariable String story, @PathVariable String scrumName) {
		
		scrumService.deAssignTask(story, scrumName);
	}	

}
