import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserRegister, UserRegisterResponse } from "../interfaces/user.interface";
import { UserEndpoint } from "../endpoints/user.endpoint";
import { map, tap } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { OperationDetail } from "../interfaces/operation.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  add(user: UserRegister): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(UserEndpoint.rest, user)
      .pipe(tap(data => {
        AuthenticationService.setToken(data.access);
      }));
  }

  getBankAccounts(user: number): Observable<any> {
    return this.http.get<any>(UserEndpoint.userBankAccounts(user));
  }

  getProfiles(user: number): Observable<User[]> {
    return this.http.get<User[]>(UserEndpoint.profilesByUser(user))
      .pipe(map(users => [AuthenticationService.getAuthData(), ...users]));
  }

  getOperations(user: number): Observable<OperationDetail[]> {
    return this.http.get<OperationDetail[]>(UserEndpoint.operationByUser(user));
  }
}
