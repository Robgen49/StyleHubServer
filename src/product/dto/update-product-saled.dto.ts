import { ApiProperty } from "@nestjs/swagger";


export class UpdateProductSaledDto {

    @ApiProperty({ example: '1', description: 'id of product' })
    readonly id: number;

    @ApiProperty({ example: '1', description: 'number of saled products' })
    readonly saled: number;
}