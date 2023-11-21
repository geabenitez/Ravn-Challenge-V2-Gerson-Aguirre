import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'admin',
  Client = 'client',
}

export const ROLES_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
