import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'luis.giraldo3@utp.edu.co',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'estaEsUnaContraseñ@Segura123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/^(?=.*[a-z])/, {
    message: 'Debe contener al menos una letra minúscula.',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Debe contener al menos una letra mayúscula.',
  })
  @Matches(/^(?=.*\d)/, { message: 'Debe contener al menos un número.' })
  @Matches(/^(?=.*[@$!%*?&])/, {
    message: 'Debe contener al menos un carácter especial.',
  })
  password: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'Luis Fernando',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'Bursano',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({
    description: 'User Phone',
    example: 3017222568,
  })
  @IsNotEmpty()
  @Min(3000000000)
  @Max(3600000000)
  @IsNumber()
  phone: number;

  @ApiProperty({
    description: 'User identification',
    example: '1004685950',
  })
  @IsNotEmpty()
  @IsString()
  identification: string;

  @ApiProperty({
    description: 'If user works in a virtual mode',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isVirtual?: boolean;

  @ApiProperty({
    description: 'User payment acount',
    example: '917176682',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  acount?: string;

  @ApiProperty({
    description: 'User address',
    example: 'Calle 12 # 34 - 56',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    description: 'User role id',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  roleId?: number;

  @ApiProperty({
    description: 'User identification type id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  identificationId?: number;

  @ApiProperty({
    description: 'User branch ofice id',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  branchOficeId?: number;

  @IsEmpty()
  personStateId?: number;

  @ApiProperty({
    description: 'User means of payment id',
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  meansOfPayment?: number;
}

export class FaultDto {
  @ApiProperty({
    description: 'fecha de inicio de la falta',
    example: '2023-10-01',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'fecha de inicio de la falta',
    example: '2023-10-03',
  })
  @IsNotEmpty()
  @IsDateString()
  @ValidateIf((o: FaultDto, value: string) => {
    const startDate = new Date(o.startDate);
    const endDate = new Date(value);
    return startDate.getTime() > endDate.getTime();
  })
  @IsNumber(
    {},
    { message: 'El la fecha de inicio debe ser anterior a la fecha final' },
  )
  endDate?: string;

  @ApiProperty({
    description: 'id del usuario',
    example: 22,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: 'justificacion de la falla si hay',
    example: 'No me encuentro en la ciudad',
  })
  @IsOptional()
  @IsString()
  @MaxLength(134217728)
  justification: string;

  @IsEmpty()
  date: string;
}
