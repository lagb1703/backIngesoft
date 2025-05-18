import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/newCore/database/database.module';
import { PaysheetController } from './paysheet.controller';
import { PaysheetService } from './paysheet.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [PaysheetController],
  providers: [PaysheetService]
})
export class PaysheetModule {}
