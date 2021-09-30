import { Injectable } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _trainer : Trainer | undefined

  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedInCurrent = this.loggedIn.asObservable();
  


  constructor() {
    const storedTrainer = localStorage.getItem("trainer");
    if(storedTrainer) {
      this._trainer = JSON.parse(storedTrainer) as Trainer;
      this.setLoggedIn(true);
    }
   }

   setLoggedIn(value : boolean) : void {
    this.loggedIn.next(value);
   }

   get trainer() : Trainer | undefined {
     return this._trainer;
   }

   setTrainer(trainer : Trainer) : void {
     this._trainer = trainer;
     localStorage.setItem("trainer",JSON.stringify(trainer));
   }

   logout() {
     this._trainer = undefined;
     localStorage.removeItem("trainer");
     this.setLoggedIn(false);
   }
}
