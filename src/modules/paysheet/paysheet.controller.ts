import {
  Controller,
  UseGuards,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards';
import { PaysheetService } from './paysheet.service';
import { GetUser, Roles } from '../auth/decorators';
import { UserAcountType } from '../user/types';
import {
  ConceptDto,
  ConceptTypeDto,
  ContractTypeDto,
  JobPositionDto,
  NoveltyDto,
  PaymentDto,
  PaysheetDto,
  PaysheetTypeDto,
} from './dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { NoveltyType } from './types';

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

  @Post('jobPosition')
  async saveJobPosition(@Body() body: JobPositionDto) {
    return await this.paysheetService.saveJobPosition(body);
  }

  @Put('jobPosition/:id')
  async updateJobPosition(
    @Body() body: JobPositionDto,
    @Param('id') id: string,
  ) {
    return await this.paysheetService.updateJobPosition(body, id);
  }

  @Delete('jobPosition/:id')
  async deleteJobPosition(@Param('id') id: string) {
    return await this.paysheetService.deleteJobPosition(id);
  }

  @Get('paysheet')
  async getAllPaysheet() {
    return await this.paysheetService.getAllPaysheet();
  }

  @UseGuards(AuthGuard)
  @Get('paysheet/userId')
  async getPaysheetByUserId(@GetUser() user: UserAcountType) {
    return await this.paysheetService.getPaysheetByUserId(user.userId);
  }

  @Put('paysheet/:id')
  async updatePaysheet(@Body() body: PaysheetDto, @Param('id') id: string) {
    return await this.paysheetService.updatePaysheet(body, id);
  }

  @Post('paysheet')
  async makePaysheet(@Body() body: PaysheetDto) {
    return await this.paysheetService.makePaysheet(body);
  }

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

  @Post('contractType')
  async saveContractType(@Body() body: ContractTypeDto) {
    return await this.paysheetService.saveContractType(body);
  }

  @Put('contractType/:id')
  async updateContractType(
    @Body() body: ContractTypeDto,
    @Param('id') id: string,
  ) {
    return await this.paysheetService.updateContractType(body, id);
  }

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

  @Post('paysheetType')
  async savePaysheetType(@Body() body: PaysheetTypeDto) {
    return await this.paysheetService.savePaysheetType(body);
  }

  @Put('paysheetType/:id')
  async updatePaysheetType(
    @Body() body: PaysheetTypeDto,
    @Param('id') id: string,
  ) {
    return await this.paysheetService.updatePaysheetType(body, id);
  }

  @Delete('paysheetType/:id')
  async deletePaysheetType(@Param('id') id: string) {
    return await this.paysheetService.deletePaysheetType(id);
  }

  @Get('novelty')
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Fecha de la novedad',
    type: String,
  })
  async getAllNovelties(@Query('date') date: string) {
    if (!date) return await this.paysheetService.getAllNovelties();
    return await this.paysheetService.getNoveltiesByDate(date);
  }

  @Get('novelty/id/:id')
  async getNoveltyById(@Param('id') id: string) {
    return await this.paysheetService.getNoveltyById(id);
  }

  @Get('novelty/contractId/:contractId')
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Fecha de la novedad',
    type: String,
  })
  async getNoveltiesByContractIdAndDates(
    @Param('contractId') contractId: string,
    @Query('date') date: string,
  ): Promise<NoveltyType[]> {
    if (!date) {
      return await this.paysheetService.getNoveltiesByContractId(contractId);
    }
    return await this.paysheetService.getNoveltiesByDateAndContractId(
      date,
      contractId,
    );
  }
  @Post('novelty')
  async saveNovelty(@Body() body: NoveltyDto) {
    return await this.paysheetService.saveNovelty(body);
  }

  @Put('novelty/:id')
  async updateNovelty(@Body() body: NoveltyDto, @Param('id') id: string) {
    return await this.paysheetService.updateNovelty(body, id);
  }

  @Delete('novelty/:id')
  async deleteNovelty(@Param('id') id: string) {
    return await this.paysheetService.deleteNovelty(id);
  }

  @Get('conceptType')
  async getAllConceptsTypes() {
    return await this.paysheetService.getAllConceptsTypes();
  }

  @Get('conceptType/:id')
  async getConceptTypeById(@Param('id') id: string) {
    return await this.paysheetService.getConceptTypeById(id);
  }

  @Post('conceptType')
  async saveConceptType(@Body() body: ConceptTypeDto) {
    return await this.paysheetService.saveConceptType(body);
  }

  @Put('conceptType/:id')
  async updateConceptType(
    @Body() body: ConceptTypeDto,
    @Param('id') id: string,
  ) {
    return await this.paysheetService.updateConceptType(body, id);
  }

  @Delete('conceptType/:id')
  async deleteConceptType(@Param('id') id: string) {
    return await this.paysheetService.deleteConceptType(id);
  }

  @Get('concept')
  async getAllConcepts() {
    return await this.paysheetService.getAllConcepts();
  }

  @Get('concept/:id')
  async getConceptById(@Param('id') id: string) {
    return await this.paysheetService.getConceptById(id);
  }

  @Post('concept')
  async saveConcept(@Body() body: ConceptDto) {
    return await this.paysheetService.saveConcept(body);
  }

  @Put('concept/:id')
  async updateConcept(@Body() body: ConceptDto, @Param('id') id: string) {
    return await this.paysheetService.updateConcept(body, id);
  }

  @Delete('concept/:id')
  async deleteConcept(@Param('id') id: string) {
    return await this.paysheetService.deleteConcept(id);
  }

  @Get('unPayments')
  async getAllUnPayments() {
    return await this.paysheetService.getAllUnPayments();
  }

  @UseGuards(AuthGuard)
  @Get('unPayments/userId')
  async getUnPaymentsByUser(@GetUser() user: UserAcountType) {
    return await this.paysheetService.getAllUnPaymentsByUserId(user.userId);
  }

  @Get('unPayments/userId/:id')
  async getUnPaymentsByUserId(@Param('id') id: string) {
    return await this.paysheetService.getAllUnPaymentsByUserId(id);
  }

  @Get('payment')
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Fecha de inicio del rango de pagos',
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'Fecha de fin del rango de pagos',
    type: String,
  })
  async getAllPayments(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (startDate && endDate) {
      return await this.paysheetService.getPaymentsByDates(startDate, endDate);
    }
    return await this.paysheetService.getAllPayments();
  }

  @Get('payment/:id')
  async getPaymentById(@Param('id') id: string) {
    return await this.paysheetService.getPaymentById(id);
  }

  @Get('payment/userId/:userId')
  async getPaymentsByUserId(@Param('userId') userId: string) {
    return await this.paysheetService.getPaymentsByUserId(userId);
  }

  @Post('payment')
  async savePayment(@Body() body: PaymentDto) {
    return await this.paysheetService.savePayment(body);
  }

  @Put('payment/:id')
  async updatePayment(@Body() body: PaymentDto, @Param('id') id: string) {
    return await this.paysheetService.updatePayment(body, id);
  }

  @Delete('payment/:id')
  async deletePayment(@Param('id') id: string) {
    return await this.paysheetService.deletePayment(id);
  }
}
