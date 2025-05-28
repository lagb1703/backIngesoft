import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from './../../newCore/database/database.module';
import { MailsModule } from '../mails/mails.module';
import { DatabaseModule as MongoCore } from 'src/mongoCore/database/database.module';

@Module({
  imports: [DatabaseModule, MailsModule, MongoCore],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
