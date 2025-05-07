import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetRoles } from '../decorators';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { JwsPayloadType } from '../types';
import { UserAcountType } from './../../user/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(SetRoles, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!roles) {
        return true;
      }
      const request: Request = context.switchToHttp().getRequest();
      const user = request.user as Partial<UserAcountType> & JwsPayloadType;
      if (!user) {
        throw new UnauthorizedException('No se encontró el usuario');
      }
      for (let i = 0; i < roles.length; i++) {
        const role = await this.authService.validateRole(roles[i], user.userId);
        if (role) {
          (request.user as any).role = roles[i];
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
