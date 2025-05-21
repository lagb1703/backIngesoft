import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { DatabaseModule } from 'src/newCore/database/database.module';
import { DatabaseModule as mongoCore } from 'src/mongoCore/database/database.module';

@Module({
  imports: [DatabaseModule, mongoCore],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
