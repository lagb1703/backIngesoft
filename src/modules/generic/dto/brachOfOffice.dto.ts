import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BranchOfOfficeDto {
  @ApiProperty({
    description: 'Name of the branch of office',
    example: 'Branch of office 1',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Address of the branch of office',
    example: '123 Main St',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    description: 'City of the branch of office',
    example: '123-456-7890',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cityId: string;
}
