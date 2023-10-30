import { createAction, props } from '@ngrx/store';

export const getUsersData = createAction('[UserMapping] Load Data');
export const getUsersDataSuccess = createAction('[UserMapping] Load UserData Success', props<{ data: any }>());
export const getUsersDataFailure = createAction('[UserMapping] Load UserData Failure', props<{ error: any }>());







