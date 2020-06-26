import { SOCIAL_PROVIDER } from "./user.interface";

export interface Credentials {
  email: string;
  password: string;
}

export interface SocialCredentials extends Credentials {
  social_provider: SOCIAL_PROVIDER;
  social_id: string;
}

export interface AuthToken {
  refresh: string;
  access: string;
}
