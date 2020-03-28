import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { TeamsComponent } from './admin/teams/teams.component';
import { TeamComponent } from './admin/teams/team/team.component';
import { UserService } from './users/user.service';
import { TeamService } from './admin/teams/team.service';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ScrumComponent } from './admin/scrums/scrum/scrum.component';
import { ScrumsComponent } from './admin/scrums/scrums.component';
import { ScrumService } from './admin/scrums/scrum.service';
import { ViewScrumsComponent } from './admin/view-scrums/view-scrums.component';
import { ShowMenuDirective } from './directives/show-menu.directive';
import { ViewScrumComponent } from './admin/view-scrums/view-scrum/view-scrum.component';
import { ToDoService } from './users/toDo.service';
import { HttpClientModule } from '@angular/common/http';
import { UserRepository } from './repository/user.repository';
import { TeamRepository } from './repository/teamRepository';
import { ScrumRepository } from './repository/scrum.repository';
import { ToDoRepository } from './repository/toDoRepository';
import { TaskRepository } from './repository/task.repository';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

const appPath = [
  { path : '', component: LoginComponent},
  { path : 'admin', component : AdminComponent },
  { path : 'users', component : UsersComponent },
  { path : 'users/:id', component : UserComponent },
  { path : 'teams', component : TeamsComponent },
  { path : 'teams/:teamName', component : TeamComponent },
  { path : 'createUser', component : AddUserComponent },
  { path : 'scrums/:scrumName', component : ScrumComponent },
  { path : 'scrums', component : ScrumsComponent },
  { path : 'viewScrums', component : ViewScrumsComponent },
  { path : 'viewScrums/:scrumName', component : ViewScrumComponent },
  { path : 'login', component : LoginComponent},
  { path : '**', redirectTo : ''}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    UserComponent,
    HomeComponent,
    AdminComponent,
    TeamsComponent,
    TeamComponent,
    AddUserComponent,
    ScrumComponent,
    ScrumsComponent,
    ViewScrumsComponent,
    ShowMenuDirective,
    ViewScrumComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appPath),
    HttpClientModule
  ],
  providers: [UserService,
              TeamService,
              ScrumService,
              ToDoService,
              UserRepository,
              TeamRepository,
              ScrumRepository,
              ToDoRepository,
              TaskRepository,
              ToDoService,
              LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
