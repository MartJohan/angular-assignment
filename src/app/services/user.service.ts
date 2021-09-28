import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "https://vuejs-assignment-3.herokuapp.com/trainers"
  private key = "RakrKsq94tlf3PZmAnuQ";
  constructor() { }

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

  async postUser(username : string) {
    await fetch(`${this.baseURL}`, {
      method : 'POST',
      headers : {
        'X-API-Key' : this.key,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        username : username,
        pokemon : []
      })
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Could not create new Trainer')
      }
      return response.json();
    })
    .then(newUser => {
      return newUser;
    })
    .catch(error => {
      console.log(error);
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