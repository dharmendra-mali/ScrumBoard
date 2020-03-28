import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScrumService } from '../scrum.service';
import { Scrum } from 'src/app/models/scrum.model';

import { Team } from 'src/app/models/team.model';
import { TeamService } from '../../teams/team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/models/tasks.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';
import { User } from 'src/app/models/user.model';
import { ScrumRepository } from 'src/app/repository/scrum.repository';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-scrum',
  templateUrl: './scrum.component.html',
  styleUrls: ['./scrum.component.css']
})
export class ScrumComponent implements OnInit {

  teamName : string = 'TEMP';
  tasks : string [] = [];
  scrum : Scrum[] ;
  teams : Team[];
  scrumName : string;
  @ViewChild('task') enteredTask : NgForm;
  @ViewChild('teamName') toAssginTeam : ElementRef;
  constructor(private scrumService : ScrumService,
              private teamService : TeamService,
              private router : Router,
              private route : ActivatedRoute,
              private scrumRepository : ScrumRepository) { }

  ngOnInit() {
    this.scrum = this.scrumService.scrum;
    this.teams = this.teamService.teams;
    this.route.params.subscribe( (p : Params)=> { this.scrumName = p['scrumName']} )
    const team = this.toAssginTeam.nativeElement.value;
    for(let i=0; i<this.scrumService.scrum.length ; i++){
      if(this.scrumService.scrum[i].scrumName === this.scrumName){
        for(let j=0; j<this.scrumService.scrum[i].tasks.length ; j++){
          this.tasks.push(this.scrumService.scrum[i].tasks[j].notes);
        }
      }
    }
  }

  addStory(){
    let statues = 1
    if(this.tasks.length===0){
      this.tasks.push(this.enteredTask.value.taskName);
      statues =2;
    } else {
      for(let task of this.tasks){
        if(task === this.enteredTask.value.taskName){
          statues = 2;
          break;
        }
      }
    }
    if(statues===1){
      this.tasks.push(this.enteredTask.value.taskName);
    }
    this.enteredTask.reset();
  }

  assignTeam(){

    for(let i=0; i<this.scrum.length; i++){

      if(this.scrum[i].scrumName === this.scrumName){
        for(let j=0; j<=this.scrum[i].tasks.length ; j++){
          this.scrum[i].tasks.splice(j , 1)
        }
        this.scrum[i].tasks.pop();
      }
    }

    for(let scrum of this.scrum){
      if(scrum.scrumName === this.scrumName){
        for(let task of this.tasks){
          scrum.tasks.push(new Tasks('NONE', task));
          scrum.team.teamName = this.toAssginTeam.nativeElement.value;          
        }
        this.scrumRepository.updateScrum(scrum);    
      }
    }
    
    this.tasks.length =0;
    for(let storyTask of this.tasks){
      this.tasks.shift()
    }
    this.tasks.shift();
    this.router.navigate(['/viewScrums']);
  }


  removeTask( task : string) {

    for(let i=0; i<this.tasks.length; i++){
      if(this.tasks[i] === task){
        this.tasks.splice(i , 1);
        break;
      }
    }
  }
}
