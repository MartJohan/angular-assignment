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

    getSpecificPokemons(pokemon : any){
        this.http.get(`${this.pokemonApi}`,pokemon)
        .subscribe((pokemon => {
          console.log(pokemon);
        }))
      }
    
     getNextPokemon(next : string) {
         return this.http.get<PokemonResponse>(next);
     }

     getPreviousPokemon(prev : string) {
         return this.http.get<PokemonResponse>(prev)
     }

      

}