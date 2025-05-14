import {
  IsDateString,
  IsEmpty,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    description: 'ID del archivo de pago',
    example: '681e777985a922f6ec4dabfa',
  })
  @IsOptional()
  @IsMongoId()
  fileId: string;

  @IsEmpty()
  paymentTimestamp: Date;

  @ApiProperty({
    description: 'ID de la novedad a pagar(puede ser nulo)',
    example: 6,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  noveltyId?: number;

  @ApiProperty({
    description: 'ID del concepto a pagar(puede ser nulo)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  conceptId?: number;

  @ApiProperty({
    description: 'ID del contrato a pagar(puede ser nulo)',
    example: 3,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  contractId?: number;

  @ApiProperty({
    description: 'ID del usuario que realiza el pago',
    example: 22,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
