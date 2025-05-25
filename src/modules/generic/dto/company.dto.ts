import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CompanyDto {
    @ApiProperty({
        description: 'nombre de la empresa',
        example: 'ACME Corp',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    company: string;

    @ApiProperty({
        description: 'correo electronico de la empresa',
        example: 'rangotv56@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}