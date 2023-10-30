export interface CustomerAddress  {
    "FIN_Services.getCustomerAddressResponse": FinServicesGetCustomerAddressResponse
  }
  
  export interface FinServicesGetCustomerAddressResponse {
    "FIN_Services.getCustomerAddressResult": FinServicesGetCustomerAddressResult
  }
  
  export interface FinServicesGetCustomerAddressResult {
    "FIN_Services.row": CustomerAddressResult[]
  }
  
  export interface CustomerAddressResult  {
    "FIN_Services.CustomerNumber": string
    "FIN_Services.CustomerName": string
    "FIN_Services.CareOf_ContactName": string
    "FIN_Services.AddressType": string
    "FIN_Services.AddressLine1": string
    "FIN_Services.AddressLine2": string
    "FIN_Services.AddressLine3": string
    "FIN_Services.City": string
    "FIN_Services.StateCode": string
    "FIN_Services.ZipCode": string
    "FIN_Services.County": string
    "FIN_Services.Country": string
    "FIN_Services.Latitude": string
    "FIN_Services.Longitude": string
  }
  // export interface CustomerDetails {
  //   "FIN_Services.getCustomerDetailsResponse": FinServicesGetCustomerDetailsResponse
  // }
  
  // export interface FinServicesGetCustomerDetailsResponse {
  //   "FIN_Services.getCustomerDetailsResult": FinServicesGetCustomerDetailsResult
  // }
  
  // export interface FinServicesGetCustomerDetailsResult {
  //   "FIN_Services.row": CustomerDetailsResult[]
  // }
  
  // export interface CustomerDetailsResult {
  //   "FIN_Services.CustomerNumber": string
  //   "FIN_Services.CustomerName": string
  //   "FIN_Services.DBAName": string
  //   "FIN_Services.PrimaryCustNumber": string
  //   "FIN_Services.BillsToPrimaryInd": string
  //   "FIN_Services.CustomerStatus": string
  //   "FIN_Services.InactiveDate": any
  //   "FIN_Services.InactiveReason": string
  //   "FIN_Services.InactiveReasonDesc": string
  //   "FIN_Services.YearBusinessStarted": number
  //   "FIN_Services.EstablishDate": string
  //   "FIN_Services.ReinstateDate": any
  //   "FIN_Services.ReinstateReason": string
  //   "FIN_Services.CustomerType": string
  //   "FIN_Services.BusinessType": string
  //   "FIN_Services.BusinessTypeDesc": string
  //   "FIN_Services.StoreNumber": string
  //   "FIN_Services.CustomerEmail": string
  //   "FIN_Services.PhoneCountryCode": string
  //   "FIN_Services.PhoneAreaCode": string
  //   "FIN_Services.PhoneNumber": string
  //   "FIN_Services.PhoneExtension": string
  //   "FIN_Services.FaxCountryCode": string
  //   "FIN_Services.FaxAreaCode": string
  //   "FIN_Services.FaxNumber": string
  //   "FIN_Services.FaxExtension": string
  //   "FIN_Services.WebPage": string
  // }
  
  // export interface CustomerStoreNumbers {
  //   "FIN_Services.getCustomerStoreNumbersResponse": FinServicesGetCustomerStoreNumbersResponse
  // }
  
  // export interface FinServicesGetCustomerStoreNumbersResponse {
  //   "FIN_Services.getCustomerStoreNumbersResult": FinServicesGetCustomerStoreNumbersResult
  // }
  
  // export interface FinServicesGetCustomerStoreNumbersResult {
  //   "FIN_Services.row": CustomerStoreNumbersResult[]
  // }
  
  // export interface CustomerStoreNumbersResult {
  //   "FIN_Services.StoreNumber": string
  //   "FIN_Services.CustomerNumber": string
  //   "FIN_Services.PrimaryCustNumber": string
  //   "FIN_Services.CustomerStatus": string
  //   "FIN_Services.CustomerName": string
  //   "FIN_Services.AddressType": string
  //   "FIN_Services.AddressLine1": string
  //   "FIN_Services.AddressLine2": string
  //   "FIN_Services.AddressLine3": string
  //   "FIN_Services.City": string
  //   "FIN_Services.StateCode": string
  //   "FIN_Services.ZipCode": string
  //   "FIN_Services.County": string
  //   "FIN_Services.Country": string
  // }
  export interface ContactDetails {
    "FIN_Services.getContactDetailsResponse": FinServicesGetContactDetailsResponse
  }
  
  export interface FinServicesGetContactDetailsResponse {
    "FIN_Services.getContactDetailsResult": FinServicesGetContactDetailsResult
  }
  
  export interface FinServicesGetContactDetailsResult {
    "FIN_Services.row": ContactDetailsResult[]
  }
  
  export interface ContactDetailsResult {
    "FIN_Services.CustomerNumber": string
    "FIN_Services.ContactType": string
    "FIN_Services.ContactTitleCode": string
    "FIN_Services.ContactTitle": string
    "FIN_Services.ContactCompanyName": string
    "FIN_Services.ContactPrimaryInd": string
    "FIN_Services.FirstName": string
    "FIN_Services.MiddleName": string
    "FIN_Services.LastName": string
    "FIN_Services.Suffix": string
    "FIN_Services.NickName": string
    "FIN_Services.ContactComments": string
    "FIN_Services.Category": string
    "FIN_Services.PhonePrimaryInd": string
    "FIN_Services.PhoneType": string
    "FIN_Services.CountryCode": string
    "FIN_Services.AreaCode": string
    "FIN_Services.PhoneNumber": string
    "FIN_Services.Extension": string
    "FIN_Services.EmailPrimaryInd": string
    "FIN_Services.Email": string
    "FIN_Services.AddressPrimaryInd": string
    "FIN_Services.AddressType": string
    "FIN_Services.AddressLine1": string
    "FIN_Services.AddressLine2": string
    "FIN_Services.AddressLine3": string
    "FIN_Services.City": string
    "FIN_Services.StateProvince": string
    "FIN_Services.ZipCode": string
    "FIN_Services.Country": string
    "FIN_Services.County": string
    "FIN_Services.Latitude": string
    "FIN_Services.Longitude": string
  }
  export  interface CustomerStoreNumbersResult {
    customerNumber: string;
    customerName: string;
    primaryCustNumber: string;
    customerStatus: string;
    storeNumber: string;
    addressType: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    stateCode: string;
    zipCode: string;
    country: string;
    countryCode: string;
  }
  export  interface CustomerDetails {
    customerNumber: string;
    customerName: string;
    primaryCustNumber: string;
    billsToPrimaryInd: string;
    customerStatus: string;
    inactiveReason: string;
    inactiveReasonDesc: string;
    yearBusinessStarted: string;
    establishDate: string;
    reinstateReason: string;
    customerType: string;
    businessType: string;
    businessTypeDesc: string;
    storeNumber: string;
    customerEmail: string;
    phoneCountryCode: string;
    phoneAreaCode: string;
    phoneNumber: string;
    phoneExtension: string;
    faxCountryCode: string;
    faxAreaCode: string;
    faxNumber: string;
    faxExtension: string;
    webPage: string;
    dbaName: string;
  }
  
  export  interface ClaimCategoryDetails {
    claimCategoryId: string,
    claimCategoryCode: string,
    claimCategoryName: string,
    displaySequence: string,
    createdByUserId: string,
    modifiedByUserId: string,
    createdDateTime: string,
    modifiedDateTime: string
  }

  export  interface ReasonCodeByCategory {
    claimReasonId: string,
    claimReasonCode: string,
    visibilityScope: string,
    reasonTypeGroup: string,
    isDistributionCompliance: string,
    sampleSizeRequirement: string,
    definition: string,
    cause: string,
    testing: string,
    createdByUserId: string,
    modifiedByUserId: string,
    createdDateTime: string,
    modifiedDateTime: string,
  }
  export  interface addInvoice {
    CustomerNumber: string,
    invoiceNumber: string,
    invoiceDate: string,
    orderNumber: string,
    bolNumber: string,
    poNumber: string,
    totalFreightAmount: string,
    totalInvoiceAmount: string,
    lineNumber: string,
    seqNumber: string,
    rollNumber: string,
    styleNumber: string,
    invoiceStyle: string,
    colorNumber: string,
    colorName: string,
    DyeLot: string,
    RcsCode: string,
    Grade: string,
    widthFeet: string,
    widthInch: string,
    lengthFeet: string,
    lengthInch: string,
    unitOfMeasure: string,
    quantity: string,
    unitPrice: string,
    netAmount: string,
    selco: string,
    division: string,
    region: string,
    territoryManager: string,
    masterBolNbr: string,
    customerNumber: string,
    dyeLot: string,
    grade: string,
    rcsCode: string
  }

  export  interface CountryCodeData {
    
      createdByUserId:string,
      modifiedByUserId: string,
      createdDateTime: string,
      modifiedDateTime: string,
      isoStateId: string
      isoStateCode: string,
      isoStateName: string,
      isoCountryId: string,
      statusId: string
    
  }

 



   