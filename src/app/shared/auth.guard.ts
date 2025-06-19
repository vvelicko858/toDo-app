import { Injectable } from '@angular/core';
import {CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard{
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    if (this.authService.isLoggedIn) {
      console.log('Logged in');
      return true;
    }
    return false
  }
}
