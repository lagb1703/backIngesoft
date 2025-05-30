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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { HabilityType, UserHabilityType } from './types';
import { AfinityDto, EducationDto, HabilityDto, UserHabilityDto } from './dto';
import { AuthGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';
import { UserAcountType } from '../user/types';

@Controller('education')
@ApiTags('education')
@UseGuards(AuthGuard) 
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

  @Get('courses')
  async getAllCourses() {
    return await this.educationService.getAllCourses();
  }

  @Get('courses/userId')
  async getCoursesByUserCookieId(
    @GetUser('userId') userId: UserAcountType,
  ) {
    return await this.educationService.getCoursesByUserId(userId.userId);
  }

  @Get('courses/userId/:userId')
  async getCoursesByUserId(
    @Param('userId') userId: string,
  ) {
    return await this.educationService.getCoursesByUserId(userId);
  }

  @Post('courses')
  async saveCourse(@Body() course: EducationDto): Promise<string> {
    return await this.educationService.saveCourse(course);
  }

  @Put('courses/:id')
  async updateCourse(
    @Body() course: EducationDto,
    @Param('id') id: string,
  ): Promise<void> {
    return await this.educationService.updateCourse(course, id);
  }

  @Delete('courses/:id')
  async deleteCourse(@Param('id') id: string): Promise<void> {
    return await this.educationService.deleteCourse(id);
  }

  @Post('courses/assistances/userId/:userId/courseId/:courseId')
  async saveAssitence(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<void> {
    return await this.educationService.saveAssitence(userId, courseId);
  }

  @Post('courses/linkCourse/userId/:userId/courseId/:courseId')
  async deleteAssitence(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<number> {
    return await this.educationService.linkCourse(userId, courseId);
  }

  @Delete('courses/unlinkCourse/:userCourseId')
  async unlinkCourse(
    @Param('userCourseId') userCourseId: string,
  ): Promise<void> {
    return await this.educationService.unlinkCourse(userCourseId);
  }
}
