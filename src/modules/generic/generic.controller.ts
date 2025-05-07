import { Controller, Body, Post } from '@nestjs/common';
import { GenericService } from './generic.service';
import { BranchOfOfficeDto, MeansOfPaymentDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('generic')
@ApiTags('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @Post('branchOfOffice')
  async saveBranchOfOffice(
    @Body() branchOfOfficeDto: BranchOfOfficeDto,
  ): Promise<number> {
    return this.genericService.saveBranchOfOffice(branchOfOfficeDto);
  }

  @Post('meansOfPayment')
  async saveMeansOfPayment(
    @Body() meansOfPaymentDto: MeansOfPaymentDto,
  ): Promise<number> {
    return this.genericService.saveMeansOfPayment(meansOfPaymentDto);
  }
}
