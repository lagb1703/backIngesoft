import { DynamicModule, Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './../../newCore/config/config.service';
import { Configuration } from './../../newCore/config/config.key';
import { UserService } from 'src/modules/user/user.service';
import { PlpgsqlService } from 'src/newCore/database/services';
import { PostgreService } from 'src/newCore/database/services';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { MailsService } from '../mails/mails.service';
import { ConfigModule as ConfigModulePostgress } from 'src/newCore/config/config.module';

const configService: ConfigService = new ConfigService();

@Module({})
class UserModule {
  static register(): DynamicModule {
    return {
      module: UserModule,
      providers: [UserService, PlpgsqlService, MailsService, PostgreService],
      exports: [UserService],
    };
  }
}

@Global()
@Module({
  imports: [
    ConfigModule,
    ConfigModulePostgress,
    UserModule.register(),
    PassportModule.register({ session: false }),
    JwtModule.register({
      global: true,
      secret: configService.get(Configuration.JWT_SECRET),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
