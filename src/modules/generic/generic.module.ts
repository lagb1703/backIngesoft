import { Module } from '@nestjs/common';
import { GenericController } from './generic.controller';
import { GenericService } from './generic.service';
import { DatabaseModule } from 'src/newCore/database/database.module';
import { DatabaseModule as MongoModule } from 'src/mongoCore/database/database.module';

@Module({
  imports: [DatabaseModule, MongoModule],
  controllers: [GenericController],
  providers: [GenericService],
})
export class GenericModule {}
