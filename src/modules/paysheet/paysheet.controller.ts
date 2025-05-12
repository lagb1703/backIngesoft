import {
  Controller,
  UseGuards,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards';
import { PaysheetService } from './paysheet.service';
import { GetUser, Roles } from '../auth/decorators';
import { UserAcountType } from '../user/types';
import {
  ContractTypeDto,
  JobPositionDto,
  PaysheetDto,
  PaysheetTypeDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('paysheet')
@ApiTags('paysheet')
export class PaysheetController {
  constructor(private readonly paysheetService: PaysheetService) {}

  @Get('jobPosition')
  async getAllJobPosition() {
    return await this.paysheetService.getAllJobPosition();
  }

  @Get('jobPosition/:id')
  async getJobPositionById(@Param('id') id: string) {
    return await this.paysheetService.getJobPositionById(id);
  }

  @UseGuards(AuthGuard)
  @Post('jobPosition')
  async saveJobPosition(@Body() body: JobPositionDto) {
    return await this.paysheetService.saveJobPosition(body);
  }

  @UseGuards(AuthGuard)
  @Put('jobPosition/:id')
  async updateJobPosition(
    @Body() body: JobPositionDto,
    @Param('id') id: string,
  ) {
    return await this.paysheetService.updateJobPosition(body, id);
  }

  @UseGuards(AuthGuard)
  @Delete('jobPosition/:id')
  async deleteJobPosition(@Param('id') id: string) {
    return await this.paysheetService.deleteJobPosition(id);
  }

  @Roles('Administrativo')
  @Get('paysheet')
  async getAllPaysheet() {
    return await this.paysheetService.getAllPaysheet();
  }

  @UseGuards(AuthGuard)
  @Get('paysheet/userId')
  async getPaysheetByUserId(@GetUser() user: UserAcountType) {
    return await this.paysheetService.getPaysheetByUserId(user.userId);
  }

  @Roles('Administrativo')
  @Put('paysheet/:id')
  async updatePaysheet(@Body() body: PaysheetDto, @Param('id') id: string) {
    return await this.paysheetService.updatePaysheet(body, id);
  }

  @UseGuards(AuthGuard)
  @Post('paysheet')
  async makePaysheet(@Body() body: PaysheetDto) {
    return await this.paysheetService.makePaysheet(body);
  }

  @Roles('Administrativo')
  @Delete('paysheet/:id')
  async deletePaysheet(@Param('id') id: string) {
    return await this.paysheetService.deletePaysheet(id);
  }

  @Get('contractType')
  async getAllContractType() {
    return await this.paysheetService.getAllContractType();
  }

  @Get('contractType/:id')
  async getContractTypeById(@Param('id') id: string) {
    return await this.paysheetService.getContractTypeById(id);
  }

  @UseGuards(AuthGuard)
  @Post('contractType')
  async saveContractType(@Body() body: ContractTypeDto) {
    return await this.paysheetService.saveContractType(body);
  }

  @UseGuards(AuthGuard)
  @Put('contractType/:id')
  async updateContractType(
    @Body() body: ContractTypeDto,
    @Param('id') id: string,
  ) {
    return await this.paysheetService.updateContractType(body, id);
  }

  @UseGuards(AuthGuard)
  @Delete('contractType/:id')
  async deleteContractType(@Param('id') id: string) {
    return await this.paysheetService.deleteContractType(id);
  }

  @Get('paysheetType')
  async getAllPaysheetType() {
    return await this.paysheetService.getAllPaysheetType();
  }

  @Get('paysheetType/:id')
  async getPaysheetTypeById(@Param('id') id: string) {
    return await this.paysheetService.getPaysheetTypeById(id);
  }

  @UseGuards(AuthGuard)
  @Post('paysheetType')
  async savePaysheetType(@Body() body: PaysheetTypeDto) {
    return await this.paysheetService.savePaysheetType(body);
  }

  @UseGuards(AuthGuard)
  @Put('paysheetType/:id')
  async updatePaysheetType(
    @Body() body: PaysheetTypeDto,
    @Param('id') id: string,
  ) {
    return await this.paysheetService.updatePaysheetType(body, id);
  }

  @UseGuards(AuthGuard)
  @Delete('paysheetType/:id')
  async deletePaysheetType(@Param('id') id: string) {
    return await this.paysheetService.deletePaysheetType(id);
  }
}
