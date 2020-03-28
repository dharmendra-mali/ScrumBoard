import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { TeamService } from './team.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { TeamRepository } from 'src/app/repository/teamRepository';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  @ViewChild('teamName') teamName : NgForm;
  teams : Team[];
  nullUser : User=new User("","","","","","NONE","");
  duplicateTeam =''
  constructor(private teamService : TeamService,
              private teamRepository : TeamRepository) { }

  ngOnInit() {
    this.teams = this.teamService.teams;
  }

  submitTeamName(){
    if(this.teamService.checkDuplicateTeam(this.teamName.value.teamName)){
      
      this.teamService.sendDuplicateTeamsStatus = false;
      this.duplicateTeam = "Team Already Exists";
    } else {
      let team = new Team(this.teamName.value.teamName,[this.nullUser]);
      team.teamUsers.pop()
      this.teamService.createTeam(team);

      this.teamRepository.createTeam(team);
      this.duplicateTeam = "Team Created";
    }
  }

  deleteTeam(teamName : string){
    this.teamService.removeTeam(teamName);
    //call services teamName
    this.teamRepository.deleteTeam(teamName);
  }

}
