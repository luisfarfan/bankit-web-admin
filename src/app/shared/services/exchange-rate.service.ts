import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExchangeRate } from "../interfaces/exchange-rate.interface";
import { ExchangeRateEndpoint } from "../endpoints/exchange-rate.endpoint";
import { share } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private http: HttpClient) {
  }

  actual(): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>(ExchangeRateEndpoint.actualExchangeRate)
      .pipe(share());
  }

  patch(id: number, exchangeRate: Partial<ExchangeRate>): Observable<ExchangeRate> {
    return this.http.patch<ExchangeRate>(`${ExchangeRateEndpoint.exchangeRate}${id}/`, exchangeRate);
  }
}
