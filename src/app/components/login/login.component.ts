import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name = new FormControl('');

  constructor(
    private userService : UserService,
    private router: Router,
      ) {

   }

  ngOnInit()  {
    if(localStorage.getItem("LoggedIn") === "1") {
      this.router.navigate(["/catalogue"]);
      this.userService.changeLoggedIn(true);
    } else {
      this.userService.changeLoggedIn(false);
    }
  }

  async logIn() {
    let body = {"username" : this.name.value, "Pokemons" : []}
    this.userService.postUser(body);
    //this.userService.changeLoggedIn(true);
    this.userService.changeUsername(this.name.value);
  }

}
