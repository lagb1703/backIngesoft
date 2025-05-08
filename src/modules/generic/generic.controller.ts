import { Controller, Body, Param, Query, Post, Get } from '@nestjs/common';
import { GenericService } from './generic.service';
import { BranchOfOfficeDto, MeansOfPaymentDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { MeansOfPaymentType } from './types';
import { BranchOfOfficeType } from './types/branchOfOffice.type';

@Controller('generic')
@ApiTags('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @Get('branchOfOffice')
  async getAllBranchOfOffice(): Promise<BranchOfOfficeType[]> {
    return this.genericService.getAllBranchOfOffice();
  }

  @Get('branchOfOffice/id/:id')
  async getBranchOfOfficeById(
    @Param('id') id: number,
  ): Promise<BranchOfOfficeType> {
    return this.genericService.getBranchOfOfficeById(id);
  }

  @Get('branchOfOffice/name')
  async getBranchOfOfficeByName(
    @Query('name') name: string,
  ): Promise<BranchOfOfficeType[]> {
    return this.genericService.getBranchOfOfficeByName(name);
  }

  @Post('branchOfOffice')
  async saveBranchOfOffice(
    @Body() branchOfOfficeDto: BranchOfOfficeDto,
  ): Promise<number> {
    return this.genericService.saveBranchOfOffice(branchOfOfficeDto);
  }

  @Get('meansOfPayment')
  async getAllMeansOfPayment(): Promise<MeansOfPaymentType[]> {
    return this.genericService.getAllMeansOfPayment();
  }

  @Get('meansOfPayment/:id')
  async getMeansOfPaymentById(
    @Param('id') id: number,
  ): Promise<MeansOfPaymentType> {
    return this.genericService.getMeansOfPaymentById(id);
  }

  @Get('meansOfPayment/name')
  async getMeansOfPaymentByName(
    @Query('name') name: string,
  ): Promise<MeansOfPaymentType[]> {
    return this.genericService.getMeansOfPaymentByName(name);
  }

  @Post('meansOfPayment')
  async saveMeansOfPayment(
    @Body() meansOfPaymentDto: MeansOfPaymentDto,
  ): Promise<number> {
    return this.genericService.saveMeansOfPayment(meansOfPaymentDto);
  }
}
