import { Component } from '@angular/core';
import {
  PermissionResponse,
  RoleApiResponse,
  RoleResponse,
} from 'src/app/interfaces/roles-permission.model';
import { RolesService } from 'src/app/ngrx/store/services/roles.service';
import { rolesListData } from './mock-roles.data';
import { permissionListData } from './mock-columns.data';
import { BodyClassService } from 'src/app/ngrx/store/services/body-class.service';
import { UserMappingService } from 'src/app/ngrx/store/services/user-mapping.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-matrix-table',
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.scss'],
})
export class MatrixTableComponent {
  roles = []; // Replace with your actual roles data
  permissions: any = []; // Replace with your actual permissions data
  rolePermissionMatrix: any[] = [];
  rolesList: any = [];
  roleCode: any;
  roleDescription: any;
  permissionCode: any;
  permissionDescription: any;
  expandedPermissions: { [key: number]: boolean } = {};
  permissionDropdownOpen: boolean = false;
  activePermissionIndex!: number;
  //selectedPermissions: { [key: string]: boolean } = {};
  public isSideNavCollapsed: boolean = true;
  public collapsed = false;
  public screenWidth = 0;
  applicationObjects: any = [];
  public allUsersData: any = [];
  filteredRoles: any[]=[];
  filteredPermissions: any[]=[];
  searchRole: string = '';
  searchValue = '';
  searchPermission: string = '';
// In your component
showEditSection: boolean = false;
selectedPermissions: string[] = [];
editingPermission: any[] = [];
selectedRole: any;
filteredRolesList: any[]=[];
roleCodeFilter: string = ''; 
permissionCodeFilter: string = '';
  constructor(
    private rolesService: RolesService,
    private bodyClassService: BodyClassService,
    private userMappingService: UserMappingService
  ) {
    // Initialize the matrix based on your data
  }

  ngOnInit() {
    this.getRoles();
    this.getApplicationObjects();
    this.geAllUsersData();
    this.filteredRoles = this.rolesList;
    this.filteredPermissions = this.permissions;
    this.filteredRolesList = [...this.rolesList];
  }

  toggleDropdown() {
    this.permissionDropdownOpen = !this.permissionDropdownOpen;
  }

  deletePermission() {
    // Add logic to delete permission for the selected permissionIndex
    console.log('Deleting permission for permissionIndex:');
  }

  public CloseRoleModal() {
    const modelDiv = document.getElementById('rolemodal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  public openRoleModal() {
    console.log('role called');
    const modelDiv = document.getElementById('rolemodal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  addRole() {
    console.log('role is called');
    const roleData = {
      roleCode: this.roleCode,
      roleDescription: this.roleDescription,
    };

    this.rolesService.addRole(roleData).subscribe(
      (response: RoleApiResponse) => {
        console.log('Role added:', response);
        // Call getRoles after successful addition
        this.getRoles();
        this.CloseRoleModal();
      },
      (error: any) => {
        console.error('Error adding role:', error);
      }
    );
  }

  getApplicationPermissions() {
    this.rolesService.getApplicationPermissions().subscribe((data) => {
      // this.permissions = permissionListData;
      this.permissions = data;
      console.log(data, 'permission');
    });
  }

  getApplicationObjects() {
    this.rolesService.getApplicationObjects().subscribe((data) => {
      // this.permissions = permissionListData;
      //this.permissions = data;
      this.applicationObjects = data;
      console.log(data, 'application objects');
    });
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (roles: any) => {
        this.rolesList = roles;
        // this.rolesList = rolesListData; // Store the response in rolesList
        this.getApplicationPermissions();

        console.log('Roles:', this.rolesList);
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
      }
    );
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

  public openPermissionModal() {
    console.log('open');
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
  addPermission() {
    console.log('role is called');
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

 

 

  public geAllUsersData() {
    this.userMappingService.getAllUsers(1, 10).subscribe(
      (data: any) => {
        this.allUsersData = data.content;

        console.log('get all users response------>', this.allUsersData);
      },
      (error) => {
        console.log('fetch user details failed: ', error);
      }
    );
  }
  filterRoles() {
    this.filteredRoles = this.rolesList.filter((role:any) =>
      role.roleCode.toLowerCase().includes(this.searchRole.toLowerCase())
    );
  }

  filterPermissions() {
    this.filteredPermissions = this.permissions.filter((permission:any) =>
      permission.permissionCode.toLowerCase().includes(this.searchPermission.toLowerCase())
    );
  }
  roleHasPermissions(role: any): boolean {
    return this.permissions.some((permission:any) => this.roleHasPermission(role, permission.permissionCode));
  }

  roleHasPermission(role: any, permissionCode: string): boolean {
    return role.permissions.includes(permissionCode);
  }

  
  // toggleEditMode(role:any) {
  //   role.editMode = !role.editMode;
  //   if (role.editMode) {
  //     role.showPermissions = true;
  //   }
  // }
  

 

  toggleShowPermissions(role: any) {
    role.showPermissions = !role.showPermissions;
  }
  toggleEditMode(role:any) {
    role.editMode = !role.editMode;
    if (role.editMode) {
      role.showPermissions = true;
    }
  }

  // isPermissionAssociated(role:any, permission:any) {
  //   // Implement logic to check if the role is associated with the permission
  //   return role.permissions.some((p:any) => p.permissionCode === permission.permissionCode);
  // }
  isPermissionAssociated(role:any, permission:any) {
    console.log('Role Permissions:', role.permissions);
    console.log('Checking Permission:', permission);
  
    const associated = role.permissions.some((p:any) => p.permissionCode === permission.permissionCode);
    console.log('Is Associated:', associated);
  
    return associated;
  }
  
 

  isPermissionSelected(permissionCode:any, rolePermissions:any) {
    return rolePermissions.some((permission:any) => permission.permissionCode === permissionCode);
  }
  applyFilter() {
    const filterValue = this.searchValue.trim().toLowerCase();
    // Apply the filter to the rolesList data
    // Update this filtering logic based on your data structure
    this.rolesList = this.rolesList.filter((role:any) => {
      return role.roleCode.toLowerCase().includes(filterValue) ||
        role.permissions.some((permission:any) => permission.permissionCode.toLowerCase().includes(filterValue));
    });
  }
  onPermissionChange(permissionId: number, roleId: number, isChecked: boolean): void {
    if (isChecked) {
      console.log('Permission selected - Permission ID:', permissionId, 'Role ID:', roleId);
  
      // Create a payload to send to the server
      const payload: any = {
        roleId: roleId,
        permissionId: permissionId,
        isActive: isChecked // Assuming isActive is part of the expected payload structure
      };
  
      this.rolesService.mapRolePermission(payload).subscribe((data) => {
       // this.permissions = data;
        console.log(data, 'permission');
        this.getRoles();
      });
    } else {
      console.log('Permission deselected - Permission ID:', permissionId, 'Role ID:', roleId);
    }
  }
  
  
}
