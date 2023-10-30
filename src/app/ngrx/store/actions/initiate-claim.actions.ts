import { createAction, props } from '@ngrx/store';

export const getCustomerData = createAction('[InitiateClaim] Load Data');
export const getCustomerDataSuccess = createAction('[InitiateClaim] Load Customer Success', props<{ data: any }>());
export const getCustomerDataFailure = createAction('[InitiateClaim] Load Customer Failure', props<{ error: any }>());

export const getStoreData = createAction('[InitiateClaim] Load Data');
export const getStoreDataSuccess = createAction('[InitiateClaim] Load Customer Success', props<{ data: any }>());
export const getStoreDataFailure = createAction('[InitiateClaim] Load Customer Failure', props<{ error: any }>());

export const getClaimCategoriesData = createAction('[InitiateClaim] Load Data');
export const getClaimCategoriesDataSuccess = createAction('[InitiateClaim] Load ClaimCategories Success', props<{ data: any }>());
export const getClaimCategoriesDataFailure = createAction('[InitiateClaim] Load CustClaimCategoriesomer Failure', props<{ error: any }>());

export const getReasonCodeByCategoryData = createAction('[InitiateClaim] Load Data');
export const getReasonCodeByCategorySuccess = createAction('[InitiateClaim] Load ReasonCode Success', props<{ data: any }>());
export const getReasonCodeByCategoryFailure = createAction('[InitiateClaim] Load ReasonCode Failure', props<{ error: any }>());

export const getAssociateGlobalAccountData = createAction('[InitiateClaim] Load Data');
export const getAssociateGlobalAccountDataSuccess = createAction('[InitiateClaim] Load ClaimCategories Success', props<{ data: any }>());
export const getAssociateGlobalAccountDataFailure = createAction('[InitiateClaim] Load CustClaimCategoriesomer Failure', props<{ error: any }>());

export enum AddInvioceTypes {
    GET_DATA = '[InitiateClaim] Load Data',
    GET_DATA_SUCCESS = '[InitiateClaim] Get Data Success',
    GET_DATA_FAILURE = '[InitiateClaim] Get Data Failure',
  }
export class GetData {
    readonly type = AddInvioceTypes.GET_DATA;
    constructor(public payload: any) {} // Pass your JSON body here if needed
  }

export const getAddInvioceData = createAction('[InitiateClaim] Load Data');
export const getAddInvioceSuccess = createAction('[InitiateClaim] Load AddInvioce Success', props<{ data: any }>());
export const getAddInvioceFailure = createAction('[InitiateClaim] Load AddInvioce Failure', props<{ error: any }>());

export const getCountryStateCodeData = createAction('[InitiateClaim] Load Data');
export const getCountryStateCodeSuccess = createAction('[InitiateClaim] Load CountryStateCode Success', props<{ data: any }>());
export const getCountryStateCodeFailure = createAction('[InitiateClaim] Load CountryStateCode Failure', props<{ error: any }>());

export const getCountryCodeData = createAction('[InitiateClaim] Load Data');
export const getCountryCodeSuccess = createAction('[InitiateClaim] Load CountryCode Success', props<{ data: any }>());
export const getCountryCodeFailure = createAction('[InitiateClaim] Load CountryCode Failure', props<{ error: any }>());

export const getCountryIsoCodeData = createAction('[InitiateClaim] Load Data');
export const getCountryIsoCodeSuccess = createAction('[InitiateClaim] Load CountryIsoCode Success', props<{ data: any }>());
export const getCountryIsoCodeFailure = createAction('[InitiateClaim] Load CountryIsoCode Failure', props<{ error: any }>());

export const getPriorClaimData = createAction('[InitiateClaim] Get Prior Claim Data', props<{ requestBody: any }>());
export const getPriorClaimDataSuccess = createAction('[InitiateClaim] Get Prior Claim Data Success', props<{ data: any }>());
export const getPriorClaimDataFailure = createAction('[InitiateClaim] Get Prior Claim Data Failure', props<{ error: any }>());

export const initiateClaim = createAction('[InitiateClaim] Initiate Claim', props<{ requestBody: any }>());
export const initiateClaimSuccess = createAction('[InitiateClaim] Initiate Claim Success', props<{ data: any }>());
export const initiateClaimFailure = createAction('[InitiateClaim] Initiate Claim Failure', props<{ error: any }>());
