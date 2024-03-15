import {IsEmpty, IsNumber, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ListAllDto {
    @ApiProperty({
        required: false,
        default: ""
    })
    search: string;

    @ApiProperty({
        required: false
    })
    parentId: string;


    @ApiProperty({
        required: false
    })
    pagination: boolean;
}