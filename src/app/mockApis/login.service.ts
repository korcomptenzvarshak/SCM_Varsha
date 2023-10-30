import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginState } from '../ngrx/store/reducers/login.reducer';
import { loginFailure, loginSuccess } from '../ngrx/store/actions/login.action';
//import { loginSuccess, loginFailure } from '../actions/login.action';
//import { LoginState } from '../reducers/login.reducer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginDataUrl = 'assets/logindata.json'; // Path to the JSON file

  private currentUser: any; // Store the currently logged-in user
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private store: Store<LoginState>) {}

  verifyLogin(username: string, password: string): Observable<any> {
    return this.http.get(this.loginDataUrl);
  }

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
 
  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  login(username: string, password: string): void {
    this.verifyLogin(username, password).subscribe((data) => {
      const user = data.find((user: { username: string; password: string; }) => user.username === username && user.password === password);
      if (user) {
        // Successful login
        this.setCurrentUser(user);
        this.store.dispatch(loginSuccess({ user }));
      } else {
        // Invalid credentials
        this.store.dispatch(loginFailure({ error: 'Invalid credentials' }));
      }
    });
  }
}
