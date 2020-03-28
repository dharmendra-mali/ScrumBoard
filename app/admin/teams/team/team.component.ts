import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/models/user.model';
import { TeamService } from '../team.service';
import { TeamRepository } from 'src/app/repository/teamRepository';
import { Team } from 'src/app/models/team.model';
import { Logs } from 'selenium-webdriver';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  users : User [];
  selectedUsers : User[]=[];
  teamName : string;
  constructor(private route: ActivatedRoute,
              private userServie: UserService,
              private teamService : TeamService,
              private router : Router,
              private teamRepository : TeamRepository) { }

  ngOnInit() {
    this.users = this.userServie.users;
    this.route.params.subscribe( 
      (params : Params) => { this.teamName = params['teamName']}
      );      
      this.selectedUsers = [];      
  }

  addToTeam(user: User){
    user.userTeamName = this.teamName;
    
    for(let team of this.teamService.teams){
      if(team.teamName === this.teamName){
        team.teamUsers.push(user);        
      }
    }
    this.teamRepository.addTeamUser(new Team(this.teamName , [user]));
  }

  reamovFromTeam(user: User){
    user.userTeamName = 'NONE'
    
    for(let team of this.teamService.teams){
      if(team.teamName === this.teamName){
        for(let i=0; i< team.teamUsers.length ; i++){
          if(user.userId === team.teamUsers[i].userId){
            team.teamUsers.splice(i,1);            
          }
        }
      }
    }
    this.teamRepository.delete_user(new Team(this.teamName , [user]));
  }
}
