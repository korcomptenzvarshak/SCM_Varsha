import { Component } from '@angular/core';
import { BodyClassService } from 'src/app/ngrx/store/services/body-class.service';



interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-user-role-permission',
  templateUrl: './user-role-permission.component.html',
  styleUrls: ['./user-role-permission.component.scss']
})
export class UserRolePermissionComponent {

  public userModel: boolean = false;
  public isSideNavCollapsed: boolean = true;
  public collapsed = false;
  public screenWidth = 0;

  constructor(
    private bodyClassService: BodyClassService
   
  ) {}

  ngOnInit(): void {
  }


  openUserModel() {
    this.userModel = true;
  }

  public onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  public getBodyClass(): string {
    return this.bodyClassService.getBodyClass(
      this.isSideNavCollapsed,
      this.screenWidth
    );
  }
}
