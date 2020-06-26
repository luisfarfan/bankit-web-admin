import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Feature, ServiceLanding } from "../interfaces/landing.interface";
import { LandingEndpoint } from "../endpoints/landing.endpoint";

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) {
  }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(LandingEndpoint.features);
  }

  editFeature(id: number, data: Partial<Feature>): Observable<Feature> {
    return this.http.patch<Feature>(`${LandingEndpoint.features}${id}/`, data);
  }

  getServices(): Observable<ServiceLanding[]> {
    return this.http.get<ServiceLanding[]>(LandingEndpoint.services);
  }

  editService(id: number, data: Partial<ServiceLanding>): Observable<ServiceLanding> {
    return this.http.patch<ServiceLanding>(`${LandingEndpoint.services}${id}/`, data);
  }
}
