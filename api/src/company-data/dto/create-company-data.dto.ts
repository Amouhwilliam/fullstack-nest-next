import {IsEmpty, IsNotEmpty, IsEnum, IsNumber, IsString, IsOptional} from "class-validator";
import {DATA_TYPE} from "./constant";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDataDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    content: string;

    @ApiProperty({ enum: [DATA_TYPE.FILE, DATA_TYPE.FOLDER]})
    @IsNotEmpty()
    @IsEnum(DATA_TYPE)
    @IsString()
    type: DATA_TYPE;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    parentId?: number;
}