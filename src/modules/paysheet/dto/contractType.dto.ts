import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ContractTypeDto {
  @ApiProperty({ example: 'Tipo de contrato' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  contractType: string;

  @ApiProperty({ example: 365 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  maxDay: number;
}
