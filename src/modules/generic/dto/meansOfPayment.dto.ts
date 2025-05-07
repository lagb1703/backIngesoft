import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MeansOfPaymentDto {
  @ApiProperty({
    description: 'Name of the means of payment',
    example: 'Cuanta Ahorro Bancolomia',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  meansOfPayment: string;
}
