export interface DynamicCrud {
    endpoint: string;
    name: string;
    filters?: DynamicField[];
    fields: DynamicField[];
}

export interface DynamicField {
    type?: FieldType;
    name: string;
    required?: boolean;
    fields?: DynamicField[];
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    keyName: string;
    access_value?: string;
    label?: string;
    showInTable?: boolean;
}

export enum FieldType {
    DATE = 'date',
    CHAR = 'input',
    NUMBER = 'number',
    CHECKBOX = 'boolean',
    IMAGE = 'file',
    EMAIL = 'email',
    LIST = 'list',
    TEXTAREA = 'textarea',
    VALIDATE = 'validate',
    DATETIME = 'datetime',
    PASSWORD = 'password'
}

export interface DynamicListPaginate<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

export interface DynamicQueryParams {
    [key: string]: string;
}
