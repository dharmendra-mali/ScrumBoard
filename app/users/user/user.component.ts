import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ScrumService } from 'src/app/admin/scrums/scrum.service';
import { Scrum } from 'src/app/models/scrum.model';
import { ToDo } from 'src/app/models/toDo.model';
import { ToDoService } from '../toDo.service';
import { Tasks } from 'src/app/models/tasks.model';
import { ToDoRepository } from 'src/app/repository/toDoRepository';
import { TaskRepository } from 'src/app/repository/task.repository';
import { ToDoHelper } from 'src/app/models/toDoHelper.model';
import { ScrumRepository } from 'src/app/repository/scrum.repository';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users : User[];
  userId : string;
  currentUser : User;
  currentTeam : string;
  scrums : Scrum[]
  userStoryFromScrum : Tasks[];
  toDoList : ToDo [];
  toDo : ToDo;
  userTeamScrum : Scrum;
  iterableToDo : ToDo;
  // story : string[];
  constructor(private userService : UserService,
              private router: Router, 
              private route : ActivatedRoute,
              private scrumService : ScrumService,
              private toDoService : ToDoService,
              private toDoRepository : ToDoRepository,
              private taskRepository : TaskRepository,
              private scrumRepository : ScrumRepository) { }

  ngOnInit() {
  
    this.scrums = this.scrumService.scrum;
    this.users = this.userService.users;
    this.toDoList = this.toDoService.toDo;
    
    this.route.params.subscribe((params : Params) => {this.userId = params['id']});
    for(let i=0; i<this.users.length; i++){
        if(this.users[i].userId===this.userId){
          this.currentUser = this.users[i];
          break;
        }
    }
    this.currentTeam = this.currentUser.userTeamName;
    for(let i=0; i<this.scrums.length; i++){
      if(this.scrums[i].team.teamName === this.currentTeam){
        this.userStoryFromScrum = this.scrums[i].tasks;
        this.userTeamScrum = this.scrums[i];
      }
    }
  }

  addToUser(story : string){ 

    console.log(story);
    
      for(let list of this.toDoList){
        
        if(list.userId === this.currentUser.userId){
          list.toDoHelper.push(new ToDoHelper(story,'TO DO'));
          console.log(story);
          
          this.toDoRepository.updateToDo(list);
           this.taskRepository.updateStatus(story, this.userTeamScrum.scrumName , list.userId);
        }
      }

      for(let toDo of this.userStoryFromScrum){
        if(toDo.notes === story){
          toDo.taskStatus = this.currentUser.userId;
        }
      }
  }


  addToProgress(str : string, story :string){
    if(str==='remove'){

      for(let toDo of this.userStoryFromScrum){
        if(toDo.notes === story){
          toDo.taskStatus = 'NONE';
          this.taskRepository.removeStatus(story, this.userTeamScrum.scrumName);
          this.toDoRepository.updateToDoTask(story, this.currentUser.userId);
          }
        }
        for(let j=0; j<this.toDoList.length; j++){
          for( let i=0 ; i<this.toDoList[j].toDoHelper.length; i++){
            if(this.toDoList[j].toDoHelper[i].story === story){
            this.toDoList[j].toDoHelper.splice(i , 1);
          }
          }
      }
    } else {
          for(let j=0; j<this.toDoList.length; j++){
            for( let i=0 ; i<this.toDoList[j].toDoHelper.length; i++){
                if(this.toDoList[j].toDoHelper[i].story === story){
                  this.toDoList[j].toDoHelper[i].status = 'PROGRESS';
                  this.toDoRepository.updateToDo(this.toDoList[j]);
                 }
            }    
          }
      }
  }
 
  addToDone(str : string, story :string){
          for(let j=0; j<this.toDoList.length; j++){
            for( let i=0 ; i<this.toDoList[j].toDoHelper.length; i++){
                if(this.toDoList[j].toDoHelper[i].story === story){
                  this.toDoList[j].toDoHelper[i].status = 'DONE';
                  this.toDoRepository.updateToDo(this.toDoList[j]);
                 }
            }    
          }
        
  }

}
