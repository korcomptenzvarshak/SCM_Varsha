import { createReducer, on } from '@ngrx/store';
import * as ClaimDuesActions from '../actions/claim-dues.actions'
import { loadData } from '../actions/claim-dues.actions';

export interface ClaimDuesState{
  data: any;
}

export const initialState: ClaimDuesState = {
  data: null,
};

export const claimDuesReducer = createReducer(
  initialState,
  on(loadData, (state) => ({ ...state, loading: true })),
  // on(loadData, (state) => ({ ...state, loading: true })),
  // on(loadDataSuccess, (state, { user }) => ({ ...state, user, loading: false, isLoggedIn: true })),
  // on(loadDataFailure, (state, { error }) => ({ ...state, error, loading: false, isLoggedIn: false }))
  // on(loadData, (state) => ({
  //   ...state,
  //   data: any,
  // })),
//   on(ClaimDuesActions.bindDataSuccess, (state, { data }) => ({
//     ...state,
//     data: data,
//   }))
);
// export const loginReducer = createReducer(
//   initialState,
//   on(login, (state) => ({ ...state, loading: true })),
//   on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false, isLoggedIn: true })),
//   on(loginFailure, (state, { error }) => ({ ...state, error, loading: false, isLoggedIn: false }))
// );
