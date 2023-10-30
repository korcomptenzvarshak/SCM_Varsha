import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from '../actions/dashboard.action';


// Define state interfaces
export interface DashboardState {
  data: any;
}

export interface LoginState {
 // isLoggedIn: boolean;
 isLoggedIn: boolean;
 error: string | null;
}

// Define initial state values
export const initialDashboardState: DashboardState = {
  data: null,
};

// export const initialLoginState: LoginState = {
//   isLoggedIn: false,
// };
//niw
// export interface LoginState {
//   isLoggedIn: boolean;
//   error: string | null;
// }

export const initialLoginState: LoginState = {
  isLoggedIn: false,
  error: null,
};
// Define dashboard reducer
export const dashboardReducer = createReducer(
  initialDashboardState,
  on(DashboardActions.loadDataSuccess, (state, { data }) => ({
    ...state,
    data: data,
  })),
  on(DashboardActions.bindDataSuccess, (state, { data }) => ({
    ...state,
    data: data,
  }))
);

// Define login reducer
// export const loginReducer = createReducer(
//   initialLoginState,
//   on(DashboardActions.loginSuccess, (state) => ({
//     ...state,
//     isLoggedIn: true,
//   }))
// );
export const loginReducer = createReducer(
  initialLoginState,
  on(DashboardActions.loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    error: null,
  })),
  on(DashboardActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error,
  }))
);