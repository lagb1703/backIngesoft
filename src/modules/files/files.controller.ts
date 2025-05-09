import {
  Controller,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Param,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { FilesService } from './services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':id')
  async getFileById(@Param('id') id: string): Promise<StreamableFile> {
    return this.filesService.getFileById(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.filesService.uploadFile(file);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    return this.filesService.deleteFile(id);
  }
}
