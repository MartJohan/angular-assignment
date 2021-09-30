import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonResponse } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  private next : string = environment.apiPokemon;
  public previous : string = "";
  public allPokemons : Pokemon[] = [];
  public pokemonUrl : string = environment.apiPokemon;
  public imageUrl : string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  public catchedPokemon : Pokemon[] = [];

  constructor(private readonly pokemonService: PokemonService, private readonly userService : UserService) { }

  ngOnInit(): void {
    this.getNextPokemon();
  }

  getNextPokemon(){
    this.pokemonService.getNextPokemon(this.next).subscribe(data => {
      this.handleResponse(data);
    },
    (error : HttpErrorResponse) => {
      console.log(error);
    })
  }

  getPreviousPokemon(){
    this.pokemonService.getNextPokemon(this.previous).subscribe(data => {
      this.handleResponse(data);
    },
    (error : HttpErrorResponse) => {
      console.log(error);
    })
  }

  handleResponse(response : PokemonResponse) {
    this.next = response.next
    this.previous = response.previous
    this.allPokemons = response.results
    this.allPokemons.forEach(pokemon => {
      let id = pokemon.url.split("/pokemon/")
      id[1] = id[1].slice(0,-1);
      pokemon.id = parseInt(id[1]);
      pokemon.imageUrl = this.imageUrl + id[1];
    });
    console.log(this.previous);
  }


  addPokemonToParty(value : Pokemon) {
    this.catchedPokemon.push(value);
    this.userService.patchUserPokemon(1,this.catchedPokemon);
  }
}