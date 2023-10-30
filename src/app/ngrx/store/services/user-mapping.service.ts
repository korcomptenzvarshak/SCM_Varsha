import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClaimCategoryDetails } from 'src/app/interfaces/customer.model';
import { userMappingFindAllusersDetails } from 'src/app/interfaces/user-mapping.model';

@Injectable({
  providedIn: 'root'
})
export class UserMappingService {
  private defaultPort = '8083';
  private apiUrl = 'http://172.20.3.195:{port}/';
  constructor(private http: HttpClient) { }

  getAllUsers(page: number, size: number): Observable<userMappingFindAllusersDetails> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.get<userMappingFindAllusersDetails>(
      modifiedApiUrl + 'users/v1/users?pageNo='+page+'&size='+size
    );
  }
  findByUser(searchType: String, value: String): Observable<ClaimCategoryDetails> {
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.get<ClaimCategoryDetails>(
      modifiedApiUrl + 'users/v1/findUser?searchType='+searchType+'&value='+value
    );
  }

  addUser(userData: any){
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.post<any>(`${modifiedApiUrl}users/v1/addUser`, userData);
  }


  changeUserStatus(userId: number, statusId: number){
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.put<any>(
      modifiedApiUrl + 'users/v1/userStatusToggle?userId='+userId+'&statusId='+statusId, {}
    )
  }

  deleteUserById(userId: number){
    const modifiedApiUrl = this.apiUrl.replace('{port}', this.defaultPort);
    return this.http.delete<any>(modifiedApiUrl + 'users/v1/deleteUserById?userId=' + userId);
  }

}
