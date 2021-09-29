import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Trainer } from './models/trainer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public currentTrainer : Trainer | {} = {}
  constructor(private userService : UserService) {}

  ngOnInit() {
   this.checkLoggedIn();
   this.checkTrainer();
    
  }

  checkLoggedIn() {
    if(localStorage.getItem("LoggedIn") === null) {
      localStorage.setItem("LoggedIn", "0");
    }

    if(localStorage.getItem("LoggedIn") !== "0") {
      this.userService.changeLoggedIn(true);
    } else {
      this.userService.changeLoggedIn(false);
    }
  }

  checkTrainer() {
    let trainer = localStorage.getItem('trainer')
    if(trainer=== null || trainer === "") {
      this.userService.changeTrainer(null);
    }else {
      // We need to use JSON.parse when getting trainers
      this.userService.changeTrainer(trainer);
    }
  }
}
