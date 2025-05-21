import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { HabilityType, UserHabilityType } from './types';
import { AfinityDto, HabilityDto, UserHabilityDto } from './dto';

@Controller('education')
@ApiTags('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get('habilities')
  async getHabilities(): Promise<HabilityType[]> {
    return await this.educationService.getHabilities();
  }

  @Post('habilities')
  async saveHability(@Body() habilityDto: HabilityDto): Promise<number> {
    return await this.educationService.saveHability(habilityDto);
  }

  @Put('habilities/:id')
  async updateHability(
    @Body() habilityDto: HabilityDto,
    @Param('id') id: number,
  ): Promise<void> {
    return await this.educationService.updateHability(habilityDto, id);
  }

  @Delete('habilities/:id')
  async deleteHability(@Param('id') id: number): Promise<void> {
    return await this.educationService.deleteHability(id);
  }

  @Get('user-habilities')
  async getAllUserHabilities(): Promise<UserHabilityType[]> {
    return await this.educationService.getAllUserHabilities();
  }

  @Get('user-habilities/userId')
  async getUserHabilitiesByUserId(
    @Query('userId') userId: number,
  ): Promise<UserHabilityType[]> {
    return await this.educationService.getUserHabilitiesByUserId(userId);
  }

  @Post('user-habilities')
  async saveHabilityUser(
    @Body() userHabilityDto: UserHabilityDto,
  ): Promise<number> {
    return await this.educationService.saveHabilityUser(userHabilityDto);
  }

  @Patch('user-habilities/:id')
  async updateHabilityUser(
    @Body() afinity: AfinityDto,
    @Param('id') id: number,
  ): Promise<void> {
    return await this.educationService.updatAfinityeHabilityUser(
      afinity.afinity,
      id,
    );
  }
}
