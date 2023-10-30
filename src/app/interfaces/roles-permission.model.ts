export interface Role {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    roleId: number;
    roleCode: string;
    roleDescription: string;
    statusId: number;
    users: User[];
    permissions: PermissionResponse[];
  }
  
  export interface User {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    userId: number;
    userKey: number;
    userName: string;
    activeDirectoryId: string;
    firstName: string;
    middleInitial: string;
    lastName: string;
    racfId: string;
    racfId2: string;
    statusId: number;
    emailAddress: string;
    lid2: string;
    lid: string;
  }
  
  export interface PermissionResponse {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    permissionId: number;
    permissionCode: string;
    permissionDescription: string;
    statusId: number;
    objects: Object[];
  }
  
  export interface Object {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    objectId: number;
    objectCode: string;
    objectDescription: string;
    statusId: number;
    applicationFunctions: ApplicationFunction[];
    applicationActions: ApplicationAction[];
  }
  
  export interface ApplicationFunction {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    functionId: number;
    functionCode: string;
    functionDescription: string;
    statusId: number;
  }
  
  export interface ApplicationAction {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    actionId: number;
    actionCode: string;
    actionDescription: string;
    statusId: number;
  }
  

export interface RoleData {
    roleCode: string;
    roleDescription: string;
  }
  
  export interface RoleResponse {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    roleId: number;
    roleCode: string;
    roleDescription: string;
    statusId: number;
    users: any[]; 
    permissions: any[]; 
  }

  export interface RoleWithSelection   {
    roleData:RoleData
    selected: boolean;
  }
  
  export interface permissionData {
    permissionCode: string;
    permissionDescription: string;
  }

  // role.interface.ts
  export interface RoleApiResponse {
    roleId: number;
    roleDescription: string;
    permissions: PermissionResponse[];
  }
  
  export interface PermissionResponse {
    permissionId: number;
    permissionDescription: string;
    // Add other properties as needed
  }

  export interface ApplicationObject {
    createdByUserId: number;
    modifiedByUserId: number;
    createdDateTime: string;
    modifiedDateTime: string;
    objectId: number;
    objectCode: string;
    objectDescription: string;
    statusId: number;
    applicationFunctions: {
      createdByUserId: number;
      modifiedByUserId: number;
      createdDateTime: string;
      modifiedDateTime: string;
      functionId: number;
      functionCode: string;
      functionDescription: string;
      statusId: number;
    }[];
    applicationActions: {
      createdByUserId: number;
      modifiedByUserId: number;
      createdDateTime: string;
      modifiedDateTime: string;
      actionId: number;
      actionCode: string;
      actionDescription: string;
      statusId: number;
    }[];
  }
  export  interface mapRolePermission {
    roleId: number;
    permissionId: number;
    isActive: boolean;
   }