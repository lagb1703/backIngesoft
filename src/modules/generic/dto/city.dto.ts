import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CityDto {
    @ApiProperty({
        example: "medellin",
        description: "The name of the city",
    })
    @IsNotEmpty()
    @IsString()
    city: string;
}