import { Injectable } from '@angular/core';
import { AbstractHttpService } from "./abstract-http.service";
import { HttpClient } from "@angular/common/http";
import { Bank } from "../interfaces/bank.interface";
import { UserEndpoint } from "../endpoints/user.endpoint";

@Injectable({
  providedIn: 'root'
})
export class BankService extends AbstractHttpService<Bank> {
  endpoint = UserEndpoint.banks;

  constructor(http: HttpClient) {
    super(http);
  }
}
