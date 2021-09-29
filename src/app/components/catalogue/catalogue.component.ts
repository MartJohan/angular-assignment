import { Component, OnInit } from '@angular/core';
import { PokemonResponse } from 'src/app/models/pokemon.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  public PokeResponse : PokemonResponse | null = null

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    
  }
  getNextPokemon(){
    let PokeResponse = this.userService.getNextPokemon();
    console.log(PokeResponse);
    
  }

}
