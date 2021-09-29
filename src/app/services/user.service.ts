import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//Whether a user is logged in or not
  private loggedIn = new BehaviorSubject(false);
  public loggedInCurrent = this.loggedIn.asObservable();

  //Observeable for username
  private username = new BehaviorSubject("");
  public usernameCurrent = this.username.asObservable();

  private baseURL = "https://vuejs-assignment-3.herokuapp.com/trainers"
  private key = "RakrKsq94tlf3PZmAnuQ";
  constructor(private http : HttpClient) { }

  changeLoggedIn(value : boolean) {
    if(value) {
      localStorage.setItem("LoggedIn","1")
    } else { localStorage.setItem("LoggedIn","0") }
    this.loggedIn.next(value);
  }

  changeUsername(value : string) {
    localStorage.setItem("username",value)
    this.username.next(value)
  }

  //HTTP calls

  async getUser(username : string) {
    await fetch(`${this.baseURL}?username=${username}`)
    .then(response => response.json())
    .then(result => {
      console.log("Got this from the get user api-call");
      console.log(result);
      return result;
    })
    .catch(error => {
      console.log(error);
    })
  }

  async postUser(user : any)  {
    console.log("inne");
      this.http.post(this.baseURL, user, {headers : {'x-api-key' : this.key}})
      .subscribe(response => {
        console.log(response)
      })
  }


  async patchUser(id : number, pokemon : Array<any>) {
    await fetch(`${this.baseURL}/trainers/${id}`, {
      method: 'PATCH', // NB: Set method to PATCH
      headers: {
          'X-API-Key': this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          // Provide new Pokémon to add trainer with id 1
          pokemon:  pokemon
      })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not update trainer')
    }
    return response.json()
  })
  .then(updatedTrainer => {
    return updatedTrainer;
  })
  .catch(error => {
    console.log(error)
  })
  }

}