import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dispalayLogout = false;
  constructor(private loginService : LoginService,
              private router : Router) { }

  ngOnInit() {
   this.loginService.logOut$.subscribe(dispalayLogout => this.dispalayLogout =dispalayLogout)
  //  this.loginService.adddispalayLogout(true);
    //this.dispalayLogout = true;
    console.log(this.dispalayLogout);
  }

  logout(){
    this.loginService.adddispalayLogout(false);
    // this.loginService.dispalayLogout = false;
    this.router.navigate(['/login']);
  }
}
