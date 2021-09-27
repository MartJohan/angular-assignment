import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn : boolean = false;

  constructor(private shared : SharedserviceService) { }

  ngOnInit(): void {
    this.shared.loggedInCurrent.subscribe(value => { this.loggedIn = value });
  }

  logOut() {
    this.shared.changeLoggedIn(false);
  }

}
