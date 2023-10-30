import { Component, OnInit } from '@angular/core';
import { PermissionResponse, Role, RoleResponse } from 'src/app/interfaces/roles-permission.model';
import { BodyClassService } from 'src/app/ngrx/store/services/body-class.service';
import { RolesService } from 'src/app/ngrx/store/services/roles.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-application-roles-permission',
  templateUrl: './application-roles-permission.component.html',
  styleUrls: ['./application-roles-permission.component.scss']
})


export class ApplicationRolesPermissionComponent implements OnInit {
  public rolesList: Role[] = [];
  roleCode: string = '';
  roleDescription: string = '';
  permissionCode: string = '';
 permissionDescription: string = '';
  public isSideNavCollapsed: boolean = true;
  public collapsed = false;
  public screenWidth = 0;
  selectedRoles: { [key: string]: boolean } = {};
  permissionsList: PermissionResponse[] = [];
  selectedPermissions: { [key: string]: boolean } = {};
  constructor(private rolesService: RolesService,
    private bodyClassService: BodyClassService,) {}

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (roles: Role[]) => {
        this.rolesList = roles; // Store the response in rolesList
        console.log('Roles:', this.rolesList);
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  
   
  addRole() {
    console.log('role is called')
    const roleData = {
      roleCode: this.roleCode,
      roleDescription: this.roleDescription,
    };

    this.rolesService.addRole(roleData).subscribe(
      (response: RoleResponse) => {
        console.log('Role added:', response);
        // Call getRoles after successful addition
        this.getRoles();
        this.CloseRoleModal();
        this.roleCode = '';
        this.roleDescription = '';
      },
      (error: any) => {
        console.error('Error adding role:', error);
      }
    );
  }
   
 //To add permisson 
addPermission() {
  console.log('role is called')
  const permissionData = {
    permissionCode: this.permissionCode,
    permissionDescription: this.permissionDescription,
  };

  this.rolesService.addPermission(permissionData).subscribe(
    (response: PermissionResponse) => {
      console.log('Role added:', response);
      // Call getRoles after successful addition
      this.getApplicationPermissions();
      this.permissionCode = ''; // Reset permissionCode
      this.permissionDescription = '';
      this.ClosePermissionModal();

    },
    (error: any) => {
      console.error('Error adding role:', error);
    }
  );
}
    deleteRole(roleId: number) {
      this.rolesService.deleteRoleById(roleId).subscribe(
        (response: RoleResponse) => { 
         
          console.log('Role deleted:', response);
          this.getRoles();
        },
        (error: any) => {
        
          console.error('Error deleting role:', error);
        }
      );
    }
    
    getApplicationPermissions(){
      this.rolesService.getApplicationPermissions().subscribe(data => {
        this.permissionsList = data;
  
        console.log(data, 'permission');
      });
    }
  
  ngOnInit() {
    this.getRoles();
    this.getApplicationPermissions();
   
  }
  
  public getBodyClass(): string {
    return this.bodyClassService.getBodyClass(
      this.isSideNavCollapsed,
      this.screenWidth
    );
  }

  public onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  public addBodyClass() {
    const bodyTag = document.body;
    bodyTag.classList.add('my-class');
  }

  public openRoleModal() {
    const modelDiv = document.getElementById('rolemodal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
}

public CloseRoleModal() {
  const modelDiv = document.getElementById('rolemodal');
  if (modelDiv != null) {
    modelDiv.style.display = 'none';
  }
}
public openPermissionModal() {
  const modelDiv = document.getElementById('permissionmodal');
  if (modelDiv != null) {
    modelDiv.style.display = 'block';
  }
}

public ClosePermissionModal() {
const modelDiv = document.getElementById('permissionmodal');
if (modelDiv != null) {
  modelDiv.style.display = 'none';
}
}
deleteSelectedRoles() {
  for (const roleId of Object.keys(this.selectedRoles)) {
    if (this.selectedRoles[roleId]) {
      const roleIdNumber: number = parseInt(roleId, 10); // Ensure it's parsed as a number
      // Assuming you have a service to delete a single role by its ID
      this.rolesService.deleteRoleById(roleIdNumber).subscribe(
        () => {
          // Delete successful, update the rolesList
          this.rolesList = this.rolesList.filter(role => role.roleId !== roleIdNumber);
          this.getRoles();
          this.ClosePermissionModal();
        },
        (error: any) => {
          console.error('Error deleting role:', error);
        }
      );
    }
  }
}

deleteSelectedPermissions() {
   for (const permissionId of Object.keys(this.selectedPermissions)) {
    if (this.selectedPermissions[permissionId]) {
      const permissionIdNumber: number = parseInt(permissionId, 10);
      // Assuming you have a service to delete a single permission by its ID
      this.rolesService.deletePermissionById(permissionIdNumber).subscribe(
        () => {
          // Delete successful, update the permissionsList
          this.permissionsList = this.permissionsList.filter(permission => permission.permissionId !== permissionIdNumber);
          this.getApplicationPermissions();
        },
        (error: any) => {
          console.error('Error deleting permission:', error);
        }
      );
    }
   }
}
}