import {
  Controller,
  UseGuards,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './../auth/guards';
import { Roles, GetUser } from '../auth/decorators';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { ApiTags, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import {
  FileUserType,
  FileUserTypeType,
  IdentificationType,
  RoleType,
  User,
  UserAcountType,
  UserStateType,
} from './types';
import { FileUserDto, FileUserTypeDto } from './dtos';
import { MongoFileType } from '../files/types';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserById(@GetUser() user: UserAcountType) {
    return await this.userService.getUserById(user.userId);
  }

  @Post('')
  async saveUser(@Body() user: UserDto): Promise<number> {
    return await this.userService.saveUser(user);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() user: UserDto,
  ): Promise<void> {
    return await this.userService.updateUser(userId, user);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    return await this.userService.deleteUser(userId);
  }

  @Roles('Administrativo', 'Reclutador')
  @Get('document')
  @ApiQuery({ name: 'identification', required: false })
  async getUserByIdentification(
    @Query('identification') identification?: string,
  ): Promise<User> {
    return await this.userService.getUserByIdentification(identification);
  }

  @Roles('Administrativo', 'Reclutador')
  @Get('filters')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'beforeDate', required: false })
  @ApiQuery({ name: 'afterDate', required: false })
  @ApiQuery({ name: 'isVirtual', required: false })
  @ApiQuery({ name: 'personState', required: false })
  @ApiQuery({ name: 'roleId', required: false })
  async getUserByFilters(
    @Query('name') name?: string,
    @Query('beforeDate') beforeDate?: string,
    @Query('afterDate') afterDate?: string,
    @Query('isVirtual') isVirtual?: string,
    @Query('personState') personState?: string,
    @Query('roleId') roleId?: string,
  ): Promise<User[]> {
    return await this.userService.getUserByFilters(
      name,
      beforeDate,
      afterDate,
      isVirtual,
      personState,
      roleId,
    );
  }

  @Roles('Administrativo')
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('states')
  async getAllStates(): Promise<UserStateType[]> {
    return await this.userService.getAllStates();
  }

  @Get('roles')
  async getAllRoles(): Promise<RoleType[]> {
    return await this.userService.getAllRoles();
  }

  @Get('rol/:userId')
  async getRolByUserId(@Param('userId') userId: string): Promise<RoleType> {
    return await this.userService.getRolByUserId(Number(userId));
  }

  @Get('identificationTypes')
  async getAllIdentificationTypes(): Promise<IdentificationType[]> {
    return await this.userService.getAllIdentificationTypes();
  }

  @Get('fileUserTypes')
  async getAllUserFilesTypes(): Promise<FileUserTypeType[]> {
    return await this.userService.getAllUserFilesTypes();
  }

  @Post('fileUserTypes')
  async saveUserFileType(
    @Body() fileUserType: FileUserTypeDto,
  ): Promise<number> {
    return await this.userService.saveUserFileType(fileUserType);
  }

  @Put('fileUserTypes/:fileTypeId')
  async updateUserFileType(
    @Param('fileTypeId') fileTypeId: string,
    @Body() fileUserType: FileUserTypeDto,
  ): Promise<void> {
    return await this.userService.updateUserFileType(fileTypeId, fileUserType);
  }

  @Delete('fileUserTypes/:fileTypeId')
  async deleteUserFileType(
    @Param('fileTypeId') fileTypeId: string,
  ): Promise<void> {
    return await this.userService.deleteUserFileType(fileTypeId);
  }

  @UseGuards(AuthGuard)
  @Post('upload/:fileTypeId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUserDto })
  async subir(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileUserDto,
    @GetUser() user: UserAcountType,
  ) {
    body.file = file;
    return this.userService.uploadFile(body, user.userId);
  }

  @Roles('Administrativo')
  @Get('files')
  async getAllUserFiles(): Promise<FileUserType[]> {
    return await this.userService.getAllUserFiles();
  }

  @UseGuards(AuthGuard)
  @Get('files/userFiles')
  async getAllUserFilesByUserId(
    @GetUser() user: UserAcountType,
  ): Promise<(FileUserType & Partial<MongoFileType>)[]> {
    return await this.userService.getAllUserFilesByUserId(user.userId);
  }

  @UseGuards(AuthGuard)
  @Delete('files/:fileId')
  async deleteUSerFile(
    @Param('fileId') fileId: string,
    @GetUser() user: UserAcountType,
  ): Promise<void> {
    return await this.userService.deleteFile(fileId, user.userId);
  }
}
