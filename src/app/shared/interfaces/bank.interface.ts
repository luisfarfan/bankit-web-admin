import { BANK_ACCOUNT_TYPE, CURRENCY } from "../../const";

export interface Bank {
    id: number;
    name: string;
    cci: boolean;
    short_name: string;
    long_name: string;
    image: string;
    num_chars_min: number;
    num_chars_max: number;
    format_mask: string;
    supports_op_code: boolean;
    commission?: Commission;
}

export interface BankAccount {
    id: number;
    bank: Bank;
    account_type: BANK_ACCOUNT_TYPE;
    currency: CURRENCY;
    account_number: string;
    account_alias: string;
    full_name_owner: string;
    user: number;
}

export interface Commission {
    id: number;
    commission: number;
    bank: number;
}
