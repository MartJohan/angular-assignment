import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private userService : UserService) {}

  ngOnInit() {
    if(localStorage.getItem("LoggedIn") === null) { localStorage.setItem("LoggedIn","0") }
    if(localStorage.getItem("username") === null) { localStorage.setItem("username", "") }
    
    if(localStorage.getItem("LoggedIn") !== "0") {
      this.userService.changeLoggedIn(true);
    } else {
      this.userService.changeLoggedIn(false);
    }
  }
}
