import { PROFILE_TYPE } from "../../const";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  social_provider: SOCIAL_PROVIDER;
  social_id: string;
  document_type: TYPE_DOCUMENT;
  dni: string;
  phone: string;
  is_superuser: boolean;
  profile_type: PROFILE_TYPE;
  owner: number;
}

export interface UserRegisterResponse extends User {
  refresh: string;
  access: string;
}

export interface UserRegister extends User {
  password1: string;
  password2: string;
}

export enum TYPE_DOCUMENT {
  DNI = 1,
  CARNET_EXTRANEJERIA = 2,
  PASAPORTE = 3,
  PTP = 4
}

export enum SOCIAL_PROVIDER {
  GOOGLE = 1,
  FACEBOOK = 2
}
