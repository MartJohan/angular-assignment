import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  public trainer : Trainer | undefined = undefined;

  constructor(private readonly userService : UserService, private readonly router : Router, private readonly sessionService : SessionService) { }
  //Gets created on page init
  ngOnInit() : void {
    this.trainer = this.sessionService.trainer;
  }
  //Removes a selected pokemon from the trainer profile
  async removePokemon(value : Pokemon) {
    console.log(value);
    let UpdatedCatch = this.trainer?.pokemon.filter(element => element.id !== value.id);
    this.userService.patchUserPokemon(this.trainer!,UpdatedCatch!, async () => {
      this.trainer = this.sessionService.trainer;
    })
  }
    

}
