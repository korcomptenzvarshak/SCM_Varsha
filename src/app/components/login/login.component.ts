import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../ngrx/store/actions/login.action';
import { Router } from '@angular/router';
import { LoginService } from '../../mockApis/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private store: Store,
    private router: Router,
    private loginService: LoginService
  ) {}

  login(): void {
    this.store.dispatch(login({ username: 'user', password: 'user123' }));

    
    this.loginService.verifyLogin(this.username, this.password).subscribe((data) => {
      const user = data.find(
        (user: { username: string; password: string; }) => user.username === 'user' && user.password === 'user123'
      );
      if (user) {
        // Successful login
        const userRole = user.userRole;
        if (userRole === 'admin') {
          alert('login success');
          this.loginService.setIsLoggedIn(true);
          this.router.navigate(['/dashboard']);
        } else {
          this.loginService.setIsLoggedIn(true);
          this.router.navigate(['/initiateClaim']);
        }
      } else {
        // Invalid credentials
        // Handle error or show appropriate message
        alert('login failed');
      }
    });
  }
}
