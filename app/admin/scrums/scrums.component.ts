import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scrum } from 'src/app/models/scrum.model';
import { ScrumService } from './scrum.service';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { ScrumRepository } from 'src/app/repository/scrum.repository';

@Component({
  selector: 'app-scrums',
  templateUrl: './scrums.component.html',
  styleUrls: ['./scrums.component.css']
})
export class ScrumsComponent implements OnInit {

  @ViewChild('scrumName') scrumName : NgForm;
  scrums : Scrum[];
  duplicate : boolean = false;
  constructor(private scrumService : ScrumService,
              private scrumRepository : ScrumRepository) { }

  ngOnInit() {
    this.scrums = this.scrumService.scrum;
  }

  getScrumName(){
    const scrumName = this.scrumName.value.teamName;
    let user = [new User("","","","","","","")];
    const team = new Team("NONE", user);
    let newScrum = new Scrum(scrumName,[], team);
    newScrum.tasks.pop();
    // newScrum.team.teamUsers.pop();
    // newScrum.team.teamName.pop();
    team.teamUsers.shift();//CHECK
    if(this.scrumService.validateDuplicate(scrumName)){
      this.scrumService.duplicate = false;
      this.duplicate = true;
    } else {
    this.scrums.push(newScrum);
    
    //create scrum service newScrum
       this.scrumRepository.crateScrum(newScrum);
      this.duplicate = false;
    }
    this.scrumName.reset();
  }

  deleteScrum(scrumName : string){
    this.scrumService.reamoveScrum(scrumName);
    //services
    this.scrumRepository.deleteScrum(scrumName);
  }

}
