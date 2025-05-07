import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from './../../newCore/database/database.module';
import { MailsModule } from '../mails/mails.module';

@Module({
  imports: [DatabaseModule, MailsModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
