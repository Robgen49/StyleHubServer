import { ApiProperty } from "@nestjs/swagger";


export class CreateProductInfoDto {

    @ApiProperty({ example: "1", description: 'id of attribute' })
    readonly attributeId: number;

    @ApiProperty({ example: "black", description: 'value of attribute' })
    readonly value: string;
}