import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
