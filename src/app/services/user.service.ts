import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//Whether a user is logged in or not
  private loggedIn = new BehaviorSubject(false);
  public loggedInCurrent = this.loggedIn.asObservable();

  //Observeable for trainer
  private trainer = new BehaviorSubject<Trainer | null>(null);
  public trainerCurrent = this.trainer.asObservable();

  private baseURL = environment.apiBaseUrl;
  private key = environment.apiKey;
  constructor(private http : HttpClient) { }

  changeLoggedIn(value : boolean) {
    if(value) {
      localStorage.setItem("LoggedIn","1")
    } else { localStorage.setItem("LoggedIn","0") }
    this.loggedIn.next(value);
  }

  changeTrainer(value : any) {
    if(value === null) {
      localStorage.setItem("trainer","");
      this.trainer.next(null);
    } else {
      localStorage.setItem("trainer", JSON.stringify(value))
      this.trainer.next(value)
    }
    
  }

  //HTTP calls
  create(user : any) : void {
    this.http.post(this.baseURL, user, {headers : {'x-api-key' : this.key}})
      .subscribe((user) => {
        console.log(user)
      },
      (error) => {
        console.log(`Error on create user ${error}`)
      })
  }

  async patchUserPokemon(id : number, pokemon : Array<any>) {
    this.http.patch(`${this.baseURL}/${id}`,pokemon, {
      headers : { 'x-api-key' : this.key }
    }).subscribe(response => {
      console.log(`Returning ${response}`)
      return response;
    })
  }
}