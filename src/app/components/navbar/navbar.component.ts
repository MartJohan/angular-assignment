import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn : boolean = false;

  constructor(private readonly user : UserService, private readonly router : Router) { }

  ngOnInit(): void {
    this.user.loggedInCurrent.subscribe(value => { this.loggedIn = value });
  }

  logOut() {
    localStorage.setItem("trainer","");
    this.user.changeTrainer(null)
    this.user.changeLoggedIn(false);

  }

}
