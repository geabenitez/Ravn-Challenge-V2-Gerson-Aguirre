import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersRepository } from '../../users/repositories/users.repository';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Validating roles');
    const requireRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.usersRepository.getSingle(request.user.uid);
    switch (requireRole) {
      case 'admin':
        return user.isAdmin;
      case 'client':
        return !user.isAdmin;
    }
  }
}
