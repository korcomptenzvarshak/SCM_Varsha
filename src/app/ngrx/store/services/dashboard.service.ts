import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerTypeRequestPayload, CustomerTypeResponseModel } from 'src/app/interfaces/dashboard.model';
import { ClaimDuesResponseModel } from 'src/app/interfaces/claim-dues.model';
// import { CustomerTypeRequestPayload, CustomerTypeResponseModel } from '../interfaces/dashboard.model';
// import { ClaimDuesResponseModel } from '../interfaces/claim-dues.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  hostURL = environment;

  private apiUrl = 'http://localhost:8080/api/getCustomerType';

  constructor(private http: HttpClient) { }

  getCustomerType(payload: CustomerTypeRequestPayload): Observable<CustomerTypeResponseModel> {
    return this.http.post<CustomerTypeResponseModel>(this.apiUrl, payload);
  }

  getClaimDuesData(): Observable<ClaimDuesResponseModel> {
    return this.http.get<ClaimDuesResponseModel>(this.apiUrl);
  }

}
