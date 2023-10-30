import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[ClaimDues] Load Data');
export const loadDataSuccess = createAction('[ClaimDues] Load Data Success', props<{ data: any }>());
export const loadDataFailure = createAction('[ClaimDues] Load Data Success', props<{ data: any }>());

// export const bindData = createAction('[ClaimDues] Bind Data');
// export const bindDataSuccess = createAction('[ClaimDues] Bind Data Success', props<{ data: any }>());
