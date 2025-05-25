import {
  Controller,
  Body,
  Param,
  Query,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { GenericService } from './generic.service';
import { BranchOfOfficeDto, MeansOfPaymentDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Citytype, MeansOfPaymentType } from './types';
import { BranchOfOfficeType } from './types/branchOfOffice.type';
import { CityDto } from './dto/city.dto';
import { CompanyType } from './types/companies.type';

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

  @Put('branchOfOffice/:id')
  async updateBranchOfOffice(
    @Body() branchOfOfficeDto: BranchOfOfficeDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.genericService.updateBranchOfOffice(branchOfOfficeDto, id);
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

  @Put('meansOfPayment/:id')
  async updateMeansOfPayment(
    @Body() meansOfPaymentDto: MeansOfPaymentDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.genericService.updateMeansOfPayment(meansOfPaymentDto, id);
  }

  @Get('cities')
  async getAllCities(): Promise<Citytype[]> {
    return this.genericService.getAllCities();
  }

  @Post('city')
  async saveCity(@Body() city: CityDto): Promise<string> {
    return this.genericService.saveCity(city);
  }

  @Delete('city/:id')
  async deleteCity(@Param('id') id: string): Promise<void> {
    return this.genericService.deleteCity(id);
  }

  @Get('companies')
  async getAllCompanies(): Promise<CompanyType[]> {
    return this.genericService.getAllCompanies();
  }

  @Post('company')
  async saveCompany(@Body() company: CompanyType): Promise<string> {
    return this.genericService.saveCompany(company);
  }

  @Delete('company/:id')
  async deleteCompany(@Param('id') id: string): Promise<void> {
    return this.genericService.deleteCompany(id);
  }
}
