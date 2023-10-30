import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../../mockApis/login.service';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    const user = this.loginService.getCurrentUser(); // Implement the method to retrieve the current user

    if (user && user.userrole === 'admin') {
      return true; // Allow access to admin page
    } else {
      this.router.navigate(['/dashboard']);
      return false; // Redirect to dashboard page for non-admin users
    }
  }
}