import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    
  }
  getNextPokemon(){
    this.userService.getNextPokemon();
  }

}
