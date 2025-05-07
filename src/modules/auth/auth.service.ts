import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserAcountType, RoleType } from '../user/types';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './../../newCore/config/config.key';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  private readonly secret: string;
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.get(Configuration.JWT_SECRET);
  }

  async signIn(
    email: string,
    pass: string,
    response: Response,
  ): Promise<{ access_token: string }> {
    const user: UserAcountType = await this.userService.getUserAcountByEmail(
      email,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await Bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const access = await this.getTokenFromUser(user);
    response.cookie('Authorization', `${access}`, {
      httpOnly: true,
      maxAge: 3600000,
    });
    return {
      access_token: access,
    };
  }

  async refreshToken(
    request: Request,
    response: Response,
  ): Promise<{ access_token: string }> {
    const token = request.cookies?.Authorization;
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(Configuration.JWT_SECRET),
        ignoreExpiration: true,
      });
      const { iat, exp, ...userData } = payload;
      const newToken = await this.getTokenFromUser(userData as UserAcountType);
      response.cookie('Authorization', newToken, {
        httpOnly: true,
        maxAge: 3600000,
      });
      return { access_token: newToken };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async getTokenFromUser(user: UserAcountType) {
    try {
      const { password, ...userData } = user;
      const token = await this.jwtService.signAsync(userData, {
        secret: this.secret,
      });
      return token;
    } catch (error) {
      this.logger.error('Error al crear el token', error);
      throw new UnauthorizedException('Error al crear el token');
    }
  }

  async getUserFromToken(
    token: string,
  ): Promise<UserAcountType & { iat: number; exp: number }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      });
      return payload;
    } catch (error) {
      this.logger.error('Error al obtener el usuario del token', error);
      throw new UnauthorizedException('Token no encontrado o inválido');
    }
  }

  async validateRole(role: string, userId: number): Promise<boolean> {
    const userRole = await this.userService.getRolByUserId(userId);
    return role === userRole.roleName;
  }

  extractTokenFromCookie(request: Request): string | undefined {
    const token = request.cookies?.Authorization;
    return token;
  }

  setCookieByToken(response: Response, token: string): void {
    response.cookie('Authorization', token, {
      httpOnly: true,
      maxAge: 3600000,
    });
  }

  async setGoogleHeaderTokenToCookieToken(req: Request,res: Response){
    if(!(typeof req['user'] == "string")){
      throw new UnauthorizedException('Token no encontrado');
    }
    const token: string = req['user'] as string;
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }
    this.setCookieByToken(res, token);
    return token;
  }
}
