import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  ClaimCategoryDetails,
  CountryCodeData,
  CustomerDetails,
  CustomerStoreNumbersResult,
  ReasonCodeByCategory,
  addInvoice,
} from 'src/app/interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class InitiateClaimService {
  hostURL = environment;
  private defaultPort = '8081';
  private replacePort = '8082';

  // private apiUrl = 'http://172.20.3.195:8081/customer/v1/';
  // private apiUrl1 = 'http://172.20.3.195:8082/claim/v1/';
  // private apiUrl2 = 'http://172.20.3.195:8082/lookup/v1/';
  //private apiUrl = 'http://172.20.3.195:8081/customer/v1/';

  private apiUrl = 'http://172.20.3.195:{port}/';

  constructor(private http: HttpClient) {}

  getCustomerDetails(customerNumber: string): Observable<CustomerDetails> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.get<CustomerDetails>(
      modifiedApiUrl +
        'customer/v1/getCustomerDetails?customerNumber=' +
        customerNumber
    );
  }
  getStoreDetails(storeNumber: number): Observable<CustomerStoreNumbersResult> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.get<CustomerStoreNumbersResult>(
      modifiedApiUrl +
        'customer/v1/getCustomerDetailsByStoreNumber?storeNumber=' +
        storeNumber
    );
  }
  getClaimCategories(): Observable<ClaimCategoryDetails> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<ClaimCategoryDetails>(
      modifiedApiUrl + 'claim/v1/getClaimCategories'
    );
  }

  getAssociateGlobalAccount(id: string): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<any>(
      modifiedApiUrl + 'lookup/v1/getLookupTypeByCode?lookupTypeCode=' + id
    );
  }
  getReasonCodeByCategory(id: number): Observable<ReasonCodeByCategory> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<ReasonCodeByCategory>(
      modifiedApiUrl + 'claim/v1/getReasonCodeByCategory/' + id
    );
  }

  public getAddInvioce(requestBody: any): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.post<addInvoice>(
      `${modifiedApiUrl}customer/v1/getInvoiceDetails`,
      requestBody
    );
  }
  getCountriesList(): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<any>(modifiedApiUrl + 'claim/v1/getCountries');
  }
  public getCountryCodeByStates(id: number): Observable<CountryCodeData> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<CountryCodeData>(
      modifiedApiUrl + 'claim/v1/getStatesByCountryId/' + id
    );
  }
  public getDialCodesByCountryId(id: number): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.get<any>(
      modifiedApiUrl + 'claim/v1/getDialCodes' 
    );
  } 
  public viewPriorClaim(requestBody: any): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.post<any>(`${modifiedApiUrl}claim/v1/getPriorClaimSummary`, requestBody);
  }
  public finalInitiateClaim(requestBody: any): Observable<any> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.replacePort);
    return this.http.post<any>(
      `${modifiedApiUrl}claim/v1/initiate`,
      requestBody
    );
  }
  
}
