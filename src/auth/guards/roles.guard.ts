import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../users/users.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get the required roles from the handler/class metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // console.log(requiredRoles);

    // If no roles are specified, allow access (public endpoint)
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 2. Get the user from the request (populated by JwtStrategy)
    const { user } = context.switchToHttp().getRequest();
    // console.log(user);

    // user should contain the JWT payload { id, email, roles }
    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied: no user roles found');
    }

    // 3. Check if the user has at least one of the required roles
    const hasRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have the required role to access this resource',
      );
    }

    return true;
  }
}
