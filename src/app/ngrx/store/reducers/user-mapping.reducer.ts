import { createReducer, on } from '@ngrx/store';
import * as UserMappingActions from '../actions/user-mapping.actions';

export interface UserInitiateState {
    data: {};
  }

export const userMappingState: UserInitiateState = {
    data: {
       
            createdByUserId : " ",
            modifiedByUserId : " ",
            createdDateTime : "",
            modifiedDateTime : "",
            userId : " ",
            userKey : " ",
            userName : " ",
            activeDirectoryId : " ",
            firstName : " ",
            middleInitial : " ",
            lastName : " ",
            racfId : " ",
            racfId2 : " ",
            statusId : " ",
            emailAddress : " ",
            lid2 : " ",
            lid : " ",
            departmentName : "",
            faxNumber :"",
            locations :[],
            phoneNumber:"",
            title :"",
            userGroups :[],

          
    }
  };
  
  

  export const userMappingReducer = createReducer(
    userMappingState,
    on(UserMappingActions.getUsersDataSuccess, (state, { data }) => ({
        ...state,
        data:data
      })),
  );
// export const userMappingReducer = createReducer(
//     userMappingState,
//     on(UserMappingActions.loadUsersData, (state) => ({
//       ...state,
//       loading: true,
//       error: null,
//     })),
//     on(UserMappingActions.loadUsersDataSuccess, (state, { data }) => ({
//       ...state,
//       data,
//       loading: false,
//     })),
//     on(UserMappingActions.loadUsersDataFailure, (state, { error }) => ({
//       ...state,
//       loading: false,
//       error,
//     }))
//   );


  
  export function getUserMappingDataDetails(state:any, action: any){
    return userMappingReducer(state,action)
  }