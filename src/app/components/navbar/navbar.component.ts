import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn : boolean = false;

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.loggedInCurrent.subscribe(value => { this.loggedIn = value });
  }

  logOut() {
    this.shared.changeLoggedIn(false);
  }

}
