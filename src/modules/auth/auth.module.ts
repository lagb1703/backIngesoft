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

const configService: ConfigService = new ConfigService();

@Module({})
class UserModule {
  static readonly postgreServiceInstance = new PostgreService();

  static readonly plpgsqlServiceInstance = new PlpgsqlService(
    UserModule.postgreServiceInstance,
  );

  static readonly userServiceInstance = new UserService(
    UserModule.plpgsqlServiceInstance,
  );
  static register(): DynamicModule {
    return {
      module: UserModule,
      providers: [
        {
          provide: UserService,
          useValue: UserModule.userServiceInstance,
        },
      ],
      exports: [
        {
          provide: UserService,
          useValue: UserModule.userServiceInstance,
        },
      ],
    };
  }
}

@Global()
@Module({
  imports: [
    ConfigModule,
    UserModule.register(),
    JwtModule.register({
      global: true,
      secret: configService.get(Configuration.JWT_SECRET),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
