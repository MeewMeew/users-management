import { User } from "src/user/entity/user.entity";

export interface UniquePayload {
  email: string;
  username: string;
}

export interface FindAllOptions {
  limit: number;
  page: number;
  search: string;
  sort: 'ASC' | 'DESC';
  key: 'name' | 'email' | 'username' | 'role' | 'id';
}

export interface FindAllResponse {
  total: number;
  data: User[];
}