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
    let trainer = localStorage.getItem("trainer");
    console.log(`Trainer : ${trainer}`)
    if(localStorage.getItem("LoggedIn") === null) { localStorage.setItem("LoggedIn","0") }
    if(trainer === "" || trainer === null) { 
      this.userService.changeTrainer(null);
    }
    else { this.userService.changeTrainer(trainer); }
    
    if(localStorage.getItem("LoggedIn") !== "0") {
      this.userService.changeLoggedIn(true);
    } else {
      this.userService.changeLoggedIn(false);
    }
  }
}
