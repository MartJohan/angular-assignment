import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  ngOnInit() : void {
    this.trainer = this.sessionService.trainer;
    console.log(this.trainer);
  }
}
