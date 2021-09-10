import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../account/shared/models/User.model';
import { TokenDto } from '../shared/models/tokenDto';

const TOKEN_KEY = 'AuthToken';
const EMAIL = 'email';

@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor() { }

  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token!==null?token:'';
  }

  public getEmail(): string {
    const email = localStorage.getItem(EMAIL);
    return email!==null?email:'';
  }

  tokenIsExpired():boolean{
    return true;
  }



  public setToken(token: TokenDto): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL);
    localStorage.setItem(TOKEN_KEY, token.value.toString());
    localStorage.setItem(EMAIL, token.email.toString());
  }

  logOut(): void {
    localStorage.clear();
  }

}
