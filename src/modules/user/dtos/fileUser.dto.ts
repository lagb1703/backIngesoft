import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FileUserTypeDto {
  @ApiProperty({
    description: 'File type of the user',
    example: 'Docuemnto de navidad',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  fileType: string;

  @ApiProperty({
    description: 'The document will be required',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isMandatory?: boolean;
}

export class FileUserDto {
  @ApiProperty({
    description: 'File type id',
    example: 1,
  })
  @IsNotEmpty()
  @IsString()
  fileTypeId: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
