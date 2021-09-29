import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerComponent } from '../trainer/trainer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name = new FormControl('');

  constructor(
    private readonly userService : UserService,
    private readonly router: Router,
      ) {

   }

  ngOnInit()  {
    if(localStorage.getItem("LoggedIn") === "1") {
      this.router.navigate(["/catalogue"]);
      this.userService.changeLoggedIn(true);
    } else {
      this.userService.changeLoggedIn(false);
    }
  }

  async logIn() {
    let trainer = {
      name : this.name.value,
      pokemon : []
    }

    this.userService.create(trainer);
    this.userService.changeLoggedIn(true);
    this.userService.changeTrainer(trainer);
    this.router.navigate(['catalogue']);

  }

}
