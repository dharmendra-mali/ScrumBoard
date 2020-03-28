import { Component, OnInit } from '@angular/core';
import { UserService } from './users/user.service';
import { TeamService } from './admin/teams/team.service';
import { TeamRepository } from './repository/teamRepository';
import { ScrumRepository } from './repository/scrum.repository';
import { ScrumService } from './admin/scrums/scrum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'newProject1';
  constructor(){ }
  ngOnInit(){

    

  }
}
