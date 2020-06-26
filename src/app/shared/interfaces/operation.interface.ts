import { OPERATION_TYPE } from "../../const";
import { BankAccount } from "./bank.interface";
import { User } from "./user.interface";
import { ExchangeRate } from "./exchange-rate.interface";

export interface Operation {
  id: number;
  account_bank_from: number;
  account_bank_to: number;
  user: number;
  operation_type: OPERATION_TYPE;
  status: number;
  amount: number;
  exchange_rate: number;
  observations: string;
}

export interface OperationDetail {
  id: number;
  account_bank_from: BankAccount;
  account_bank_to: BankAccount;
  user: User;
  operation_type: OPERATION_TYPE;
  status: number;
  amount: number;
  exchange_rate: ExchangeRate;
  observations: string;
}
