import {
  IsString,
  IsDateString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  Max,
  Validate,
  IsInt,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidateIf,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class NumberLengthValidate implements ValidatorConstraintInterface {
  validate(n: number, args: ValidationArguments) {
    const nLength = String(n).length;
    return nLength <= 5;
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) No puede ser mayor a 5 digitos';
  }
}

import { ApiProperty } from '@nestjs/swagger';
export class NoveltyDto {
  @ApiProperty({
    description: 'nombre de la novedad',
    example: 'bono navideño',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description:
      'fecha de vencimiento de la novedad, (siempre debe ser mayor a la fecha actual)',
    example: '2025-12-25',
  })
  @IsNotEmpty()
  @IsDateString()
  @Validate((o, value) => {
    const today = new Date();
    const date = new Date(value);
    return date > today;
  })
  date: string;

  @ApiProperty({
    description: 'porcentaje de la novedad, puede ser nulo',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Validate(NumberLengthValidate)
  percentage?: number;

  @ApiProperty({
    description: 'valor de la novedad, puede ser nulo',
    example: '1000000',
  })
  @ValidateIf((o) => o.percentage === undefined)
  @IsInt()
  @Min(0)
  value?: number;
}
