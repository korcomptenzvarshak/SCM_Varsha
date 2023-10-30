    export interface ClaimDuesResponseModel {
    label: string;
    text: string;

  }
  
  export interface ClaimDocument {
    documentTypeId: number;
    documentNumber: string;
  }
  
 export interface EndUserInformationDTO {
    firstName?: string;
    middleInitial?: string;
    lastName?: string;
    companyName?: string;
    countryId?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateId?: string;
    postalCode?: string;
    county?: string;
    businessPhoneDialCodeId?: string;
    businessPhoneNumber?: string;
    businessPhoneExtension?: string;
    homePhoneNumber?: string;
    homePhoneExtension?: string;
    cellPhoneDialCodeId?: string;
    cellPhoneNumber?: string;
    cellPhoneExtension?: string;
    emailAddress?: string;
  }
  
  export interface PrioClaimEndUserInformationDTO {
    firstName?: string;
    lastName?: string;
    addressLine1?: string;
    homePhoneNumber?: string;
    businessPhoneNumber?:string;
    cellPhoneNumber?:string;
  }
  export interface priorClaimPayload {
    customerNumber: string;
   // claimCategoryId: number;
    //claimReasonId: number;
   // jobStopped: boolean;
   // workStatusId: number;
  //  priorityClaim: boolean;
    //globalAccount: number;
    claimDocumentDTO?: ClaimDocument[];
    endUserInformationDTO?: PrioClaimEndUserInformationDTO;
  }

  export interface initiateClaimPayload {
    customerNumber: string;
     claimCategoryCode: string;
    //claimCategoryId: number;
    claimReasonId: number;
    jobStopped: boolean;
    //workStatusId: number;
    priorityClaim: boolean;
    endUserClaim:boolean;
    globalAccount: number;
    claimAmountUsd: number;
    claimDocumentDTO?: ClaimDocument[];
    endUserInformationDTO?: EndUserInformationDTO;
  }