import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trainer } from 'src/app/models/trainer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  private trainer : Trainer | null = null;
  private trainerSub : Subscription | undefined;

  constructor(private readonly userService : UserService, private readonly router : Router) { }

  ngOnInit() : void {
    this.trainerSub = this.userService.trainerCurrent.subscribe(trainer => this.trainer = trainer)
    console.log(this.trainer === null);
    if(this.trainer === null){
      this.router.navigate(["/login"])
    }
  }

  ngOnDestroy() {
    this.trainerSub?.unsubscribe();
  }

}
