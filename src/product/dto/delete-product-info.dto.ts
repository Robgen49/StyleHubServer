import { ApiProperty } from "@nestjs/swagger";


export class DeleteProductInfoDto {

    @ApiProperty({ example: "1", description: 'id of product' })
    readonly productId: number;

    @ApiProperty({ example: "1", description: 'id of attribute' })
    readonly attributeId: number;
}