import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { templateSourceUrl } from '@angular/compiler';
import { Router } from '@angular/router';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../users/user.service';
import { TeamRepository } from '../repository/teamRepository';
import { TeamService } from '../admin/teams/team.service';
import { ScrumRepository } from '../repository/scrum.repository';
import { ScrumService } from '../admin/scrums/scrum.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginData') loginData: NgForm;
  showMessage = '';
  dispalayLogout:boolean;
  constructor(private router : Router,
              private userRepo : UserRepository,
              private userService : UserService,
              private teamRepsitory : TeamRepository,
              private teamService : TeamService,
              private scrumRepository : ScrumRepository,
              private scrumService : ScrumService,
              private loginService : LoginService) { }

  ngOnInit() {
    this.loginService.logOut$.subscribe(dispalayLogout => this.dispalayLogout =dispalayLogout);
  }

  login(){
    let user : User = new User("","","","","","","");
    user.userEmail = this.loginData.value.email;
    user.password = this.loginData.value.password;
    
    let tempUser = user;
    this.userRepo.validateUser(user).subscribe(
      users => {
        tempUser = users;
        if(tempUser.userDesignation ==='MANAGER'){
          this.teamRepsitory.getAllTeams().subscribe(
            teams => this.teamService.teams = teams
          );
      
          this.scrumRepository.getAllScrum().subscribe(
            scrums => {this.scrumService.scrum = scrums;}
          )
          this.userService.initializeData().subscribe(
            user=> this.userService.users = user
          );
          this.loginService.adddispalayLogout(true);
          this.router.navigate(['/admin'])
        } else if(tempUser.userDesignation==='null'){
          this.router.navigate(['/login'])
          this.showMessage = 'Invalid username and password'
        } else {
          this.userService.initializeData().subscribe(
            user=> this.userService.users = user
          );
          this.loginService.adddispalayLogout(true);
          this.router.navigate(['/users', tempUser.userId ])

        }
      }
    );


}
}
