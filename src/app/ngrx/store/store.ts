

// import { Action, ActionReducerMap } from '@ngrx/store';
// import { DashboardState, dashboardReducer } from './dashboard.reducer';
// import { LoginState, loginReducer } from './reducers/login.reducer';



// export interface AppState {
//   dashboard: DashboardState;
//   login: LoginState;
// }

// export const reducers: ActionReducerMap<AppState, Action> = {
//   dashboard: dashboardReducer,
//   login: loginReducer,
// };
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './reducers/login.reducer';
import { ClaimDuesState } from './reducers/claim-dues.reducer';
import { CustomerStoreNumbersResult, CustomerDetails, ClaimCategoryDetails, ReasonCodeByCategory, addInvoice, CountryCodeData} from 'src/app/interfaces/customer.model';


export const selectLoginState = createFeatureSelector<LoginState>('login');
export const ClaimDuesStates = createFeatureSelector<ClaimDuesState>('loadData');
export const initiateClaimStates = createFeatureSelector<CustomerDetails>('initiateClaim');
export const initiateStoreStates = createFeatureSelector<CustomerStoreNumbersResult>('store');
export const initiateClaimCategoryStates = createFeatureSelector<ClaimCategoryDetails>('store');
export const reasonCodeCategoryStates = createFeatureSelector<ReasonCodeByCategory>('store');
export const addInvoiceStates = createFeatureSelector<addInvoice>('store');
export const addCountryCodeStates = createFeatureSelector<CountryCodeData>('store');
export const PriorClaimState = createFeatureSelector<any>('store');
export const initiateState = createFeatureSelector<any>('store');
export const initiateUserMappingState = createFeatureSelector<any>('store');


export const selectUser = createSelector(selectLoginState, (state) => state.user);
export const selectError = createSelector(selectLoginState, (state) => state.error);
export const selectLoading = createSelector(selectLoginState, (state) => state.loading);
export const initiateClaimState = createSelector(initiateClaimStates, (state) => state);
export const storeState = createSelector(initiateStoreStates, (state) => state);
export const storeClaimCategoryState = createSelector(initiateClaimCategoryStates, (state) => state);
export const reasonCodeCategoryState = createSelector(reasonCodeCategoryStates, (state) => state);
export const addInvoiceState = createSelector(addInvoiceStates, (state) => state);
export const addCountryCodeState = createSelector(addCountryCodeStates, (state) => state);
export const selectPriorClaimState = createSelector(PriorClaimState, (state) => state);
export const selectInitiateState = createSelector(initiateState, (state) => state);
export const initiateUserMappingStates = createSelector(initiateUserMappingState, (state) => state);



//export const selectPriorClaimState = createSelector(PriorClaimState, (state) => state.priorClaim);
// export const selectPriorClaimData = createSelector(selectPriorClaimState, (state) => state.data);
// export const selectPriorClaimLoading = createSelector(selectPriorClaimState, (state) => state.loading);
// export const selectPriorClaimError = createSelector(selectPriorClaimState, (state) => state.error);
