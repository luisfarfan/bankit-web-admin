export const ROUTERS = []

export enum OPERATION_TYPE {
    COMPRA = 1,
    VENTA = 2
}

export enum CURRENCY {
    SOLES = 1,
    DOLARES = 2
}

export enum BANK_ACCOUNT_TYPE {
    AHORROS = 1,
    CORRIENTE = 2
}

export enum PROFILE_TYPE {
    PERSONA = 1,
    EMPRESA = 2
}

export const AUTH_TOKEN_STORAGE = '__TOKEN_STORAGE';
export const AUTH_ME_STORAGE = '__ME';
export const AUTH_REFRESH_TOKEN = '___REFRESH___';
