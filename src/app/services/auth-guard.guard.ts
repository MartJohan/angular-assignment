import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Trainer } from '../models/trainer.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  private trainer : Trainer | null = null;
  private trainerSub : Subscription | undefined = undefined;
  constructor(private readonly userService : UserService, private readonly router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log(`Trainer is ${this.trainer}`)
        // if user is logged in return true; 
        if(this.userService.trainer !== undefined) {
          return true;
        }
        //if not, return false;
        this.router.navigate(['login'])
        return false;
      
  }
  
}
