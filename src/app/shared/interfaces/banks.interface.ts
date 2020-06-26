export enum BANKS_STATUS {
    ONLINE = 0,
    LOW = 1,
    OFFLINE = 2
}

export interface Banks {
    name: string;
    short_name: string;
    status: BANKS_STATUS;
    image: string;
    comission: number;
}
