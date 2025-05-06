import { Module } from '@nestjs/common';
import { CoreModule } from './../newCore/core.module';
import { CoreModule as CoreModuleMongol } from './../mongoCore/core.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, CoreModuleMongol, AuthModule],
})
export class ModulesModule { }
