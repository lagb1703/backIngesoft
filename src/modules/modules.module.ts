import { Module } from '@nestjs/common';
import { CoreModule } from './../newCore/core.module';
import { CoreModule as CoreModuleMongol } from './../mongoCore/core.module'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GenericModule } from './generic/generic.module';
import { MailsModule } from './mails/mails.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [CoreModule, CoreModuleMongol, AuthModule, UserModule, GenericModule, MailsModule, FilesModule],
})
export class ModulesModule { }
