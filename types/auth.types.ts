export interface Credentials {
  username: string;
  password: string;
}

export interface Authorization {
  access_token: string;
}

export enum REGEX {
  EMAIL = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
  USERNAME = '^[a-zA-Z0-9]{3,20}$',
  PASSWORD = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{9,16}$',
}