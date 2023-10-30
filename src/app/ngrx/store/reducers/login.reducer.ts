import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from '../actions/login.action';

export interface LoginState {
  user: string | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

export const initialState: LoginState = {
  user: null,
  error: null,
  loading: false,
  isLoggedIn: false,
};

export const loginReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false, isLoggedIn: true })),
  on(loginFailure, (state, { error }) => ({ ...state, error, loading: false, isLoggedIn: false }))
);
