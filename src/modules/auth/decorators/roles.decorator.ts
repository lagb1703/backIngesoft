import { applyDecorators, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard, AuthGuard } from './../guards';

export const SetRoles = Reflector.createDecorator<string[]>({ key: 'roles' });



export function Roles(...roles: string[]) {
  return applyDecorators(
    SetRoles(roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
