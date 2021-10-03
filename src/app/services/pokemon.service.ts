import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Pokemon, PokemonResponse } from "../models/pokemon.model";

@Injectable({
    providedIn: 'root'
})
export class PokemonService{
    private baseURL = environment.apiBaseUrl;        
    private key = environment.apiKey;
  
    private next : string = environment.apiPokemon;
    private previous : string = "";
    private pokemons : Pokemon[] = [];
    private pokeResult : PokemonResponse | null = null;
    private pokemonApi = environment.apiPokemon

    constructor(private readonly http : HttpClient) {

    }
    //Get a specific pokemon
    getSpecificPokemons(pokemonName : any){
        return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      }
    //Get the next 20 pokemon displayed on the cateoloug page
     getNextPokemon(next : string) {
         return this.http.get<PokemonResponse>(next);
     }
     //Get the previous 20 pokemon displayed on the cateoloug page
     getPreviousPokemon(prev : string) {
         return this.http.get<PokemonResponse>(prev)
     }

      

}