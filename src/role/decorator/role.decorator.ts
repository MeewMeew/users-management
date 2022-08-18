import { SetMetadata } from '@nestjs/common';
import { Role } from 'types/enum/role.enum';

export const ROLE_KEY = 'role';
export const UseRole = (role: Role) => SetMetadata(ROLE_KEY, role);
