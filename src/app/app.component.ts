import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private shared : SharedService) {}

  ngOnInit() {
    if(localStorage.getItem("LoggedIn") === null) { localStorage.setItem("LoggedIn","0") }

    if(localStorage.getItem("LoggedIn") !== "0") {
      this.shared.changeLoggedIn(true);
    } else {
      this.shared.changeLoggedIn(false);
    }
  }
}
