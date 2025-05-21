import {
  IsDateString,
  IsArray,
  IsNotEmpty,
  MinLength,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class EducationDto {
  @ApiProperty({
    description: 'nombre del curso',
    example: 'Javascript basico',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'fecha de inicio del curso',
    example: '2023-01-01',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'fecha de finalizacion del curso',
    example: '2023-01-05',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'habilidades del curso',
    example: [1],
  })
  @IsNotEmpty()
  @IsArray()
  @Type(() => Number)
  habilities: number[];
}
