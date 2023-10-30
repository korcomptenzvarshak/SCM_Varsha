import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[Dashboard] Load Data');
export const loadDataSuccess = createAction('[Dashboard] Load Data Success', props<{ data: any }>());
export const bindData = createAction('[Dashboard] Bind Data');
export const bindDataSuccess = createAction('[Dashboard] Bind Data Success', props<{ data: any }>());
// export const login = createAction('[Login] Login', props<{ username: string; password: string }>());
// export const loginSuccess = createAction('[Login] Login Success');
export const login = createAction(
    '[Login] Login',
    props<{ username: string; password: string }>()
  );
  
  export const loginSuccess = createAction('[Login] Login Success');
  export const loginFailure = createAction(
    '[Login] Login Failure',
    props<{ error: string }>() // Add the 'error' property in the props
  );
  //export const loginFailure = createAction('[Login] Login Failure');
