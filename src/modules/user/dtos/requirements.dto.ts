import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RequirementDto {
  @ApiProperty({
    description: 'descripcion del requerimiento',
    example: 'Desarrollador Backend',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @ApiProperty({
    description: 'salario inicial del requerimiento',
    example: 30000,
  })
  @IsNotEmpty()
  @IsInt()
  initialSalary: number;

  @ApiProperty({
    description: 'salario final del requerimiento',
    example: 60000,
  })
  @IsNotEmpty()
  @IsInt()
  finalSalary: number;

  @ApiProperty({
    description: 'indica si el requerimiento es virtual',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isVirtual: boolean;
}
