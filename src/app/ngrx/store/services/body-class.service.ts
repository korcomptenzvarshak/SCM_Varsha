import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyClassService {

  constructor() { }
  

  getBodyClass(isSideNavCollapsed: boolean, screenWidth: number): string {
    let styleClass = '';

    if (isSideNavCollapsed && screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (isSideNavCollapsed && screenWidth <= 768 && screenWidth > 0) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
