import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonResponse } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  private next : string = environment.apiPokemon;
  private previous : string = "";
  private pokemons : Pokemon[] = [];

  constructor(private readonly pokemonService: PokemonService) { }

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
    this.pokemons = response.results
  }
}
