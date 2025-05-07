import {
  Body,
  UseGuards,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UserAccountDto } from './dtos';
import { AuthService } from './auth.service';
import { AuthGuard, RolesGuard } from './guards';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';
import { Roles } from './decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() userAccount: UserAccountDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(
      userAccount.email,
      userAccount.password,
      response,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshToken(request, response);
  }

  @Get('')
  @Roles('Administrador')
  pepe() {
    return 'pepe';
  }

  @Get('google/login')
  @UseGuards(AuthGuardPassport('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuardPassport('google'))
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.setGoogleHeaderTokenToCookieToken(req, res);
  }
}
