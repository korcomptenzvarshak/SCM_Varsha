export interface userMappingFindAllusersDetails{
    
    createdByUserId : string,
    modifiedByUserId : string,
    createdDateTime : string,
    modifiedDateTime : string,
    userId : string,
    userKey : string,
    userName : string,
    activeDirectoryId : string,
    firstName : string,
    middleInitial : string,
    lastName : string,
    racfId : string,
    racfId2 : string,
    statusId : string,
    emailAddress : string,
    lid2 : string,
    lid : string,
    departmentName : string,
    faxNumber :string,
    locations :[],
    phoneNumber:string,
    title :string,
    userGroups :[],
     
}

export interface statusDetails{
createdByUserId: string,
modifiedByUserId: string,
createdDateTime: string,
modifiedDateTime: string,
userId: string,
userKey: string,
userName: string,
activeDirectoryId: string,
firstName: string,
middleInitial: string,
lastName: string,
racfId: string,
racfId2: string,
statusId: string,
emailAddress: string,
departmentName: string,
title: string,
phoneNumber: string,
faxNumber: string,
userGroups: [
  {
    createdByUserId: string,
    modifiedByUserId: string,
    createdDateTime: string,
    modifiedDateTime: string,
    userGroupId: string,
    userGroupCode: string,
    userGroupDescription: string,
    statusId: string
  }
],
locations: [
  {
    createdByUserId: string,
    modifiedByUserId: string,
    createdDateTime: string,
    modifiedDateTime: string,
    locationId: string,
    locationCode: string,
    locationDescription: string,
    statusId: string
  }
],
userApprovalLimit: [
  {
    createdByUserId: string,
    modifiedByUserId: string,
    createdDateTime: string,
    modifiedDateTime: string,
    userApprovalLimitId: string,
    userId: string,
    approvalLimitTypeId: string,
    approvalLimit: string,
    statusId: string
  }
],
lid: string,
lid2: string
}
