import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn : boolean = false;

  constructor(private user : UserService) { }

  ngOnInit(): void {
    this.user.loggedInCurrent.subscribe(value => { this.loggedIn = value });
  }

  logOut() {
    localStorage.setItem("username","");
    this.user.changeLoggedIn(false);
  }

}
