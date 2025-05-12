import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaysheetTypeDto {
  @ApiProperty({ example: 'Tipo de nómina' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  paysheet: string;

  @ApiProperty({ example: 15 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(31)
  payDay: number;
}

export class PaysheetDto {
  @ApiProperty(
    { 
      description: 'Salario en pesos colombianos', 
      example: 1000 
    }
  )
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  salary: number;
  @ApiProperty(
    {
      description: 'id del contrato firmado por el usuario', 
      example: "sdjfñaskjflsajfañsljfsld"
    }
  )
  @IsNotEmpty()
  @IsString()
  fileId: string;

  @ApiProperty(
    { 
      description: 'id del tipo de nómina', 
      example: 7 
    }
  )
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  paysheetTypeId: number;

  @ApiProperty(
    {
      description: 'id del tipo de contrato', 
      example: 3
    }
  )
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  contractTypeId: number;

  @ApiProperty(
    { 
      description: 'id del puesto de trabajo', 
      example: 1 
    }
  )
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  jobPositionId: number;

  @ApiProperty(
    { 
      description: 'id de los requerimientos del puesto de trabajo', 
      example: 1 
    }
  )
  @IsNotEmpty()
  @IsString()
  requestId: string;

  @ApiProperty(
    { 
      description: 'id del usuario', 
      example: 22
    }
  )
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}

