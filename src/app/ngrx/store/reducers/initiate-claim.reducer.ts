import { createReducer, on } from '@ngrx/store';
import * as InitiateClaimActions from '../actions/initiate-claim.actions';


// Define state interfaces
export interface InitiateState {
  data: {};
}


// Define initial state values
export const initialClaimState: InitiateState = {
  data: {
    customerNumber: "",
    customerName: "",
    primaryCustNumber: "",
    billsToPrimaryInd: "",
    customerStatus: "",
    inactiveReason: "",
    inactiveReasonDesc: "",
    yearBusinessStarted: "",
    establishDate: "",
    reinstateReason: "",
    customerType: "",
    businessType: "",
    businessTypeDesc: "",
    storeNumber: "",
    customerEmail: "",
    phoneCountryCode: "",
    phoneAreaCode: "",
    phoneNumber: "",
    phoneExtension: "",
    faxCountryCode: "",
    faxAreaCode: "",
    faxNumber: "",
    faxExtension: "",
    webPage: "",
    dbaName: "",
  },
};


// Define initiateClaimReducer
export const initiateClaimReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getCustomerDataSuccess, (state, { data }) => ({
      ...state,
      data:data
    

    })),
);

export function getCustomerDetails(state:any, action: any){
  return initiateClaimReducer(state,action)
}



// Define initial state values
export const initialStoreState: InitiateState = {
  data: {
    customerNumber: "",
    customerName: "",
    primaryCustNumber: "",
    customerStatus: "",
    storeNumber: "",
    addressType: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    stateCode: "",
    zipCode: "",
    country: "",
    countryCode: "",
  },
};


// Define initiateClaimReducer
export const initiateStoreReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getCustomerDataSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);

export function getStoreDetails(state:any, action: any){
  return initiateStoreReducer(state,action)
}

// Define initial state values
export const initialClaimCategoryState: InitiateState = {
  data: {
    claimCategoryId:"", 
    claimCategoryCode: "",
    claimCategoryName: "",
    displaySequence: "",
    createdByUserId:"",
    modifiedByUserId: "",
    createdDateTime: "",
    modifiedDateTime:""
  },
};



// Define initiateClaimCategoryReducer
export const  initiateClaimCategoryReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getClaimCategoriesDataSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);

export function getClaimCategoryDetails(state:any, action: any){
  return initiateClaimCategoryReducer(state,action)
}

// Define initial state values
export const reasonCodeByCategoryState: InitiateState = {
  data: {
    claimReasonId: "",
    claimReasonCode: "",
    visibilityScope: "",
    reasonTypeGroup: "",
    isDistributionCompliance: "",
    sampleSizeRequirement: "",
    definition: "",
    cause: "",
    testing: "",
    createdByUserId: "",
    modifiedByUserId: "",
    createdDateTime: "",
    modifiedDateTime: "",
  }
};


// Define initiateClaimCategoryReducer
export const reasonCodeByCategoryReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getReasonCodeByCategorySuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);

export function getReasonCodeByCategoryDetails(state:any, action: any){
  return reasonCodeByCategoryReducer(state,action)
}


// Define addInvoice state values
export const addInvoiceState: InitiateState = {
  data: {
    claimReasonId: "",
    CustomerNumber: " ",
    invoiceNumber: " ",
    invoiceDate: " ",
    orderNumber: " ",
    bolNumber: " ",
    poNumber: " ",
    totalFreightAmount: " ",
    totalInvoiceAmount: " ",
    lineNumber: " ",
    seqNumber: " ",
    rollNumber: " ",
    styleNumber: " ",
    invoiceStyle: " ",
    colorNumber: " ",
    colorName: " ",
    DyeLot: " ",
    RcsCode: " ",
    Grade: " ",
    widthFeet: " ",
    widthInch: " ",
    lengthFeet: " ",
    lengthInch: " ",
    unitOfMeasure: " ",
    quantity: " ",
    unitPrice: " ",
    netAmount: " ",
    selco: " ",
    division: " ",
    region: " ",
    territoryManager: " ",
    masterBolNbr: " ",
    customerNumber: " ",
    dyeLot: " ",
    grade: " ",
    rcsCode: " "
  }
};


// Define addInvoiceReducer
export const addInvoiceReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getAddInvioceSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);

export function addInvoiceDetails(state:any, action: any){
  return addInvoiceReducer(state,action)
}

export const  initiateAssociateGlobalAccountReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getAssociateGlobalAccountDataSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);
export const  countryListsReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getCountryCodeSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);
export const  countryListsIsoIdReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getCountryIsoCodeSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);

export const CountryStates: InitiateState = {
  data: {
    createdByUserId:" ",
    modifiedByUserId: " ",
    createdDateTime: " ",
    modifiedDateTime: " ",
    isoStateId: " ",
    isoStateCode: " ",
    isoStateName: " ",
    isoCountryId: " ",
    statusId: " "
  }
};

// Define addInvoiceReducer
export const CountryStatesCodeDataReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getCountryStateCodeSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);

export function CountryStateCodeDetails(state:any, action: any){
  return CountryStatesCodeDataReducer(state,action)
}


export const  priorClaimReducer = createReducer(
  initialClaimState,
  on(InitiateClaimActions.getPriorClaimDataSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);

export const  initiateReducer= createReducer(
  initialClaimState,
  on(InitiateClaimActions.initiateClaimSuccess, (state, { data }) => ({
      ...state,
      data:data
    })),
);
