import { BASEURL } from "../utils";

export class AuthenticationEndpoint {
  static authToken = `${BASEURL}token/`;
  static refreshToken = `${BASEURL}token/refresh/`;
  static verifyToken = `${BASEURL}token/verify/`;
  static socialToken = `${BASEURL}social-token/`;
  static me = `${BASEURL}user/me/`;
}
