import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemnResponse, Pokemon } from '../models/pokemon.model';

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

  private next : string = environment.apiPokemon;
  private previous : string = "";
  private pokemons : Pokemon[] = [];

  constructor(private http : HttpClient) { }
  private pokemonApi = environment.apiPokemon

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

  async getSpecificPokemons(pokemon : any){
    this.http.get(`${this.pokemonApi}`,pokemon)
    .subscribe((pokemon => {
      console.log(pokemon);
    }))
  }

  getNextPokemon(){
    console.log("first " + this.next)
    this.http.get<PokemnResponse>(this.next)
    .subscribe(this.handleResponse)
  }

  getPreviousPokemon(){
    this.http.get<PokemnResponse>(this.previous)
    .subscribe(this.handleResponse)
  }
  
  handleResponse(response : PokemnResponse) {
      this.next = response.next
      console.log(this.next);
      this.previous = response.previous
      this.pokemons = response.results
  }


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