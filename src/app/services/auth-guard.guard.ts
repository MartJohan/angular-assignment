import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Trainer } from '../models/trainer.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  private trainer : Trainer | null = null;
  private trainerSub : Subscription | undefined = undefined;
  constructor(private readonly sessionService : SessionService, private readonly router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.sessionService.trainer !== undefined) {
      return true;
    }      

    this.router.navigate(['login'])
    alert("You need to log in to view this page")
    return false;
  }
  
}
