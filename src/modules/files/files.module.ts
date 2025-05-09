import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService, MongoService } from './services';
import { ConfigModule } from './../../newCore/config/config.module';
import { DatabaseModule } from './../../mongoCore/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, MongoService],
})
export class FilesModule {}
