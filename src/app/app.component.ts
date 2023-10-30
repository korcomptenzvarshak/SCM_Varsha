import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './mockApis/login.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
 export class AppComponent implements OnInit {
  title = 'first-app';
  isSideNavCollapsed = false;
  screenWidth = 0;
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.getIsLoggedIn();

    // if (!this.isLoggedIn) {
    //   this.router.navigate(['/login']);
    // }
  }

onToggleSideNav(data: SideNavToggle): void {
  this.screenWidth = data.screenWidth;
  this.isSideNavCollapsed = data.collapsed;
}
}


