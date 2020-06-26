export interface Credentials {
    email: string;
    password: string;
}

export interface AuthToken {
    refresh: string;
    access: string;
}
