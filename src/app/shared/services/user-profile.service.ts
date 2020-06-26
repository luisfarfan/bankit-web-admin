import { Injectable } from '@angular/core';
import { AbstractHttpService } from "./abstract-http.service";
import { User } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { UserEndpoint } from "../endpoints/user.endpoint";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends AbstractHttpService<User> {
  endpoint = UserEndpoint.profile;

  constructor(http: HttpClient) {
    super(http);
  }
}
