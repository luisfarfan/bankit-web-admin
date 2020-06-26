import { BASEURL } from "../utils";

export class UserEndpoint {
  static rest = `${BASEURL}user/`;
  static banks = `${BASEURL}banks/`
  static userBankAccounts = (id) => `${BASEURL}user/${id}/bank-accounts/`
  static bankAccounts = `${BASEURL}user/bank-accounts/`
  static profile = `${BASEURL}user/profile/`;
  static profilesByUser = (id) => `${BASEURL}user/${id}/profiles/`;
  static operationByUser = (id) => `${BASEURL}user/${id}/operations/`;
}
