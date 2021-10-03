import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public loggedIn : boolean = false;
  public loggedInSub : Subscription | undefined;

  constructor(private readonly user : UserService,
    private readonly router : Router,
    private readonly sessionService : SessionService) {}

    //Gets created on page init
    ngOnInit() {
      this.loggedInSub = this.sessionService.loggedInCurrent.subscribe(value => this.loggedIn = value);
    }
  //Logs out the user
  logOut() {
    this.sessionService.logout();
    this.router.navigate(['login']);
    this.sessionService.setLoggedIn(false);
  }

}
