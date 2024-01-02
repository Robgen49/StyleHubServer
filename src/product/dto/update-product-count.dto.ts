import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductCountDto {

    @ApiProperty({ example: '1', description: 'id of product' })
    readonly id: number;

    @ApiProperty({ example: '100', description: `current count of this product's exemplars` })
    readonly count: number;
}