import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Configuration } from './../../../newCore/config/config.key';
import { ConfigService } from './../../../newCore/config/config.service';
import { UserService } from './../../user/user.service';
import { AuthService } from '../auth.service';
import { UserDto } from 'src/modules/user/dtos';
import { UserAcountType } from 'src/modules/user/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly secret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get(Configuration.GOOGLE_CLIENT_ID),
      clientSecret: configService.get(Configuration.GOOGLE_CLIENT_SECRET),
      callbackURL: configService.get(Configuration.GOOGLE_CALLBACK_URL),
      scope: ['email', 'profile'],
    });
    this.secret = configService.get(Configuration.JWT_SECRET);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // Aquí puedes buscar o registrar el usuario en tu DB
    return await this.validateUser(profile);
  }

  async createToken(user: UserAcountType): Promise<string> {
    try {
      return await this.authService.getTokenFromUser(user);
    } catch {
      throw new UnauthorizedException('error al crear el token');
    }
  }

  async validateUser(profile: Profile): Promise<string> {
    if (!profile.emails)
      throw new UnauthorizedException(
        'No se encontró el correo electrónico en el perfil de Google',
      );
    let user: UserAcountType = await this.userService.getUserAcountByEmail(
      profile.emails?.[0].value,
    );
    if (!user) {
      const userDto: UserDto = {
        name: profile.displayName,
        email: profile.emails?.[0].value,
        password: '',
        lastName: profile.name?.familyName,
        phone: 0,
        identification: '',
        address: '',
        roleId: 3,
        identificationId: 1,
        branchOficeId: 5,
        personStateId: 1,
        meansOfPayment: 4,
      };
      user = {
        userId: await this.userService.saveUser(userDto),
        email: profile.emails?.[0].value,
      };
    }
    return await this.createToken(user);
  }
}
