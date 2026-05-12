import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// This should mirror the payload you sign in AuthService
export interface JwtPayload {
  id: number;
  email: string;
  roles: string[]; // matches Users.roles
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // use env variable
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // The payload is already verified (signature, expiration).
    // You can do additional checks here (e.g., user still exists in DB).
    // For RBAC, simply return the payload – it will be attached to request.user.
    if (!payload.roles || payload.roles.length === 0) {
      throw new UnauthorizedException('User has no roles assigned');
    }
    return payload;
  }
}
