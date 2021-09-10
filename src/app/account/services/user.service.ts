import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/User.model';
import { map } from 'rxjs/operators';
import { Review } from '../shared/models/Review.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  currentUser$ = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient,
    private tokenService: TokenService
  ) {
  }


  getCurrentUserByEmail(): Observable<User> {
    return this.http.get<User>(environment.API_ROOT + "users/email?email=" + this.tokenService.getEmail()).pipe(
      map((reponse: User) => {
        this.currentUser$.next(reponse);
        return reponse;
      })
    );
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.API_ROOT + "users/all/" + this.tokenService.getEmail());
  }


  getUserReviewByEmail(email: String): Observable<Review[]> {
    return this.http.get<Review[]>(environment.API_ROOT + "review/email?email=" + email);
  }


  getUserByEmail(email: String): Observable<User> {
    return this.http.get<User>(environment.API_ROOT + "users/email?email=" + email);
  }

 

  getUserById(idProfile: String): Observable<User> {
    return this.http.get<User>(environment.API_ROOT + "users/id?id=" + idProfile);
  }

  

}
