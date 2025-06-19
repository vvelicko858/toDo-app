import { Injectable } from '@angular/core';
import {findUserInLocalStorage} from './data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this._isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    const savedLoginStatus = sessionStorage.getItem('isLoggedIn');
    if (savedLoginStatus === 'true') {
      this._isLoggedIn = true;
    }
  }

  private _isLoggedIn = false;

  get isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
    sessionStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }

  login(username: string, password: string): boolean {
    const result = findUserInLocalStorage(username, password);
    if (result.found && result.user) {
      this.isLoggedIn = true;
      sessionStorage.setItem('userName', result.user.name); // Сохраняем имя
      return true;
    }
    return false;
  }

  getUserName(): string | null {
    return sessionStorage.getItem('userName');
  }


  logout(): void {
    this._isLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userName');
  }
}
