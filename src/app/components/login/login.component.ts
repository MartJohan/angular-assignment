import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerComponent } from '../trainer/trainer.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly userService : UserService,
    private readonly router: Router,
    private readonly sessionService : SessionService
      ) {

   }

  ngOnInit()  {
    if(this.sessionService.trainer !== undefined) {
      this.router.navigate(['catalogue'])
    }
  }

  get attempting() : boolean {
    return this.userService.attempting;
  }

  onSubmit(loginForm : NgForm) : void {
    
    const { username } = loginForm.value;

    this.userService.authenticate(username, async () => {
      this.sessionService.setLoggedIn(true);
      await this.router.navigate(['catalogue'])
    });
  }
}
