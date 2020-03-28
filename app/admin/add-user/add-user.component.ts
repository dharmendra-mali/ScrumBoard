import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/users/user.service';
import { NgForm } from '@angular/forms';
import { TeamService } from '../teams/team.service';
import { Team } from 'src/app/models/team.model';
import { UserRepository } from 'src/app/repository/user.repository';
import { ToDoRepository } from 'src/app/repository/toDoRepository';
import { ToDo } from 'src/app/models/toDo.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('userForm') enteredUserData : NgForm;
  users : User[];
  newUser : User;
  teams : Team[];
  defaultDesignation = "SOFTWARE ENGINNER";
  defaultTeam ="NONE"
  showStatus : string = ''; 
  constructor(private userService : UserService,
              private teamService : TeamService,
              private userRepository : UserRepository,
              private toDoRepository : ToDoRepository) { }

   
  ngOnInit(){
    this.users = this.userService.users;
      this.teams = this.teamService.teams;
    
  }

  submitForm(){

    this.newUser = this.enteredUserData.value;
    this.newUser.password = "123";
    if(this.userService.checkDuplicateUser(this.newUser.userId)){

      this.showStatus = "PLEASE CHOOSE ANOTHER USER ID";
      this.userService.duplicateIdStatus = false;
    }else if(this.userService.checkDuplicateEmail(this.newUser.userEmail)){

      this.showStatus = "PLEASE CHOOSE ANOTHER EMAIL";
      this.userService.duplicateEmailStatus = false;
    } else {

      this.userService.addUser(this.newUser);
      for(let i=0;i<this.teams.length; i++){
        if(this.teams[i].teamName === this.newUser.userTeamName){
          this.teams[i].teamUsers.push(this.newUser);
        }
      }
      // this.teams.push(new Team(this.newUser.userTeamName , [this.newUser]))
      this.showStatus = 'USER CREATED';
      //submitting the form to database
      this.userRepository.createUser(this.newUser);
    }
    this.toDoRepository.createToDo(new ToDo(this.newUser.userId,[]));
    this.enteredUserData.reset();
  }

  deleteCurrentUser(user : User) : void{
    this.userService.removeUser(user.userId);
     this.userRepository.deleteUser(user.userId);      
    
  }
}
