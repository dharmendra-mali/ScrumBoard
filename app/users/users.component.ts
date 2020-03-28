import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { ToDoRepository } from '../repository/toDoRepository';
import { ToDoService } from './toDo.service';
import { ScrumRepository } from '../repository/scrum.repository';
import { ScrumService } from '../admin/scrums/scrum.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[];
  constructor(private userService : UserService,
              private toDoRepository : ToDoRepository,
              private toDoService : ToDoService,
              private scrumRepository : ScrumRepository,
              private scrumService : ScrumService ) { }

  ngOnInit() {
    this.userService.initializeData();
    this.toDoRepository.initialize().subscribe(
      toDo => {this.toDoService.toDo = toDo;}        
    );
    this.users = this.userService.users
    this.scrumRepository.getAllScrum().subscribe(
      scrum => this.scrumService.scrum = scrum
    )
  }
}
