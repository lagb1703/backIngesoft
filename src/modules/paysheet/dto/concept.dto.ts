import {
  IsEmpty,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NumberLengthValidate } from './novelty.dto';

export class ConceptTypeDto {
  @ApiProperty({
    description: 'nombre del concepto',
    example: 'Transporte',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  conceptType: string;

  @ApiProperty({
    description: 'valor minimo del concepto, puede ser nulo',
    example: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  minValue?: number;

  @ApiProperty({
    description: 'valor maximo del concepto, puede ser nulo',
    example: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @ValidateIf((o) => o.minValue !== undefined && o.maxValue !== undefined)
  @Validate(
    (o, value) => {
      if (value < o.minValue) {
        return false;
      }
      return true;
    },
    {
      message: 'maxValue must be greater than minValue',
    },
  )
  maxValue?: number;

  @ApiProperty({
    description: 'porcentaje del concepto',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Validate(NumberLengthValidate)
  percentage: number;

  @IsEmpty()
  minMaxValue: string;
}

export class ConceptDto {
  @ApiProperty({
    description: 'id del concepto',
    example: 9,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  conceptTypeId: number;

  @ApiProperty({
    description: 'id de la ciudad',
    example: '681e777985a922f6ec4dabfa',
  })
  @IsNotEmpty()
  @IsMongoId()
  cityId: string;

  @ApiProperty({
    description: 'id de la empresa',
    example: '681e777985a922f6ec4dabfa',
  })
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;
}
