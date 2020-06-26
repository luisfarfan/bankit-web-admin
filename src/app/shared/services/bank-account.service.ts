import { Injectable } from '@angular/core';
import { AbstractHttpService } from "./abstract-http.service";
import { HttpClient } from "@angular/common/http";
import { UserEndpoint } from "../endpoints/user.endpoint";
import { BankAccount } from "../interfaces/bank.interface";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService extends AbstractHttpService<BankAccount> {
  endpoint = UserEndpoint.bankAccounts;

  constructor(http: HttpClient) {
    super(http);
  }
}
