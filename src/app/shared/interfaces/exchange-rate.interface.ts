import { OPERATION_TYPE } from "../../const";

export interface ExchangeRate {
  id: number;
  purchase: number;
  sale: number;
}

export interface ExchangeRateOperation {
  purchase: number;
  sale: number;
  operation: OPERATION_TYPE
}
