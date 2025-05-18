import { Global, Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService, MongoService } from './services';
import { ConfigModule } from './../../newCore/config/config.module';
import { DatabaseModule } from './../../mongoCore/database/database.module';
import { FileGeneratorService } from './services/file-generator.service';

@Global()
@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, MongoService, FileGeneratorService],
  exports: [FilesService, FileGeneratorService],
})
export class FilesModule {}
