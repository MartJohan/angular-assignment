import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    //Whether a user is logged in or not
    private loggedIn = new BehaviorSubject(false);
    public loggedInCurrent = this.loggedIn.asObservable();

  constructor() { }

  changeLoggedIn(value : boolean) {
    if(value) {
      localStorage.setItem("LoggedIn","1")
    } else { localStorage.setItem("LoggedIn","0") }
    this.loggedIn.next(value);
  }
}
