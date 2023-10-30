import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationObject, PermissionResponse, Role, RoleData, RoleResponse, mapRolePermission, permissionData } from 'src/app/interfaces/roles-permission.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private replacePort = '8083';



  private apiUrl = 'http://172.20.3.195:{port}/';
  
  constructor(private http: HttpClient) {}

  public getApplicationPermissions(): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<any>(`${modifiedApiUrl}users/v1/applicationPermissions`);
  }

  getRoles(): Observable<Role[]> { // Use the interface
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<Role[]>(`${modifiedApiUrl}users/v1/applicationRoles`);
    
  }
  addRole(roleData: RoleData): Observable<RoleResponse> {
    console.log("Service"+JSON.stringify(roleData));
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.post<RoleResponse>(`${modifiedApiUrl}users/v1/addRole`,roleData);
  }

  deleteRoleById(roleId: number): Observable<RoleResponse> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.delete<RoleResponse>(`${modifiedApiUrl}users/v1/deleteRoleById?roleId=${roleId}`);
  }
  
  addPermission(permissionDataData: permissionData): Observable<PermissionResponse> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.post<PermissionResponse>(`${modifiedApiUrl}users/v1/addPermission`,permissionDataData);
  }

  deletePermissionById(permissionId: number): Observable<PermissionResponse> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.delete<PermissionResponse>(`${modifiedApiUrl}users/v1/deletePermissionById?permissionId=${permissionId}`);
  }

  
  getApplicationObjects(): Observable<ApplicationObject[]> { // Use the interface
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<ApplicationObject[]>(`${modifiedApiUrl}users/v1/applicationObjects`);
    
  }
  mapRolePermission(map: mapRolePermission): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.post<any>(`${modifiedApiUrl}users/v1/mapRolePermission`, map);
}

 
}
