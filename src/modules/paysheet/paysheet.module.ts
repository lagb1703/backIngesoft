import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/newCore/database/database.module';
import { PaysheetController } from './paysheet.controller';
import { PaysheetService } from './paysheet.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PaysheetController],
  providers: [PaysheetService]
})
export class PaysheetModule {}
