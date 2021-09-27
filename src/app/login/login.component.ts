import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private shared : SharedserviceService) {

   }

  async ngOnInit()  {
    this.shared.loggedInCurrent.subscribe(value => { console.log(`Logged in value is ${value}`)})
  }

  logIn() {
    localStorage.setItem("LoggedIn","1");
    this.shared.changeLoggedIn(true);
  }

}
