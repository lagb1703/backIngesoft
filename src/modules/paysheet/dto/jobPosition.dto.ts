import { IsString, MaxLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class JobPositionDto{
    @ApiProperty({ example: "Cargo de ejemplo" })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    jobPosition: string;
}