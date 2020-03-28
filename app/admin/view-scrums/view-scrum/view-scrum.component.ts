import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ScrumService } from '../../scrums/scrum.service';
import { Scrum } from 'src/app/models/scrum.model';
import { Tasks } from 'src/app/models/tasks.model';
import { ScrumRepository } from 'src/app/repository/scrum.repository';

@Component({
  selector: 'app-view-scrum',
  templateUrl: './view-scrum.component.html',
  styleUrls: ['./view-scrum.component.css']
})
export class ViewScrumComponent implements OnInit {

  scrum : Scrum ;
  scrumName : string;
  tasks : Tasks[] = [];
  displayConent : boolean = true;
  constructor(private route : ActivatedRoute,
              private scrumService : ScrumService,
              private scrumReapository : ScrumRepository) { }

  ngOnInit() {
    this.route.params.subscribe( (p : Params) => { this.scrumName = p['scrumName']});
    
    for(let i =0; i< this.scrumService.scrum.length; i++){
      if(this.scrumService.scrum[i].scrumName === this.scrumName){
        this.scrum = this.scrumService.scrum[i];
      }
    }

    this.tasks = this.scrum.tasks;
     this.displayConent = true;
  }

  removeStory(story : string, scrumName : string){
    this.scrumReapository.removeTask(story,scrumName)
    this.scrumService.removeScrumStory(story, scrumName);
    
  }

  deleteScrum(scrumName : string){
    this.scrumService.reamoveScrum(scrumName);
    this.scrumReapository.deleteScrum(scrumName)
    this.displayConent = false;
  }


}
