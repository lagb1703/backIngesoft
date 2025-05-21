import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HabilityDto {
  @ApiProperty({
    description: 'nombre de la habilidad',
    example: 'JavaScript',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'peso de la habilidad',
    example: 50,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  weight: number;
}

export class AfinityDto {
  @ApiProperty({
    description: 'nivel de la habilidad',
    example: 50,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  afinity: number;
}

export class UserHabilityDto extends AfinityDto {
  @ApiProperty({
    description: 'id del usuario',
    example: 22,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: 'id de la habilidad',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  habilityId: number;
}
