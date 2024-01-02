import { ApiProperty } from "@nestjs/swagger";
import { CreateProductInfoDto } from "./create-product-info.dto";

export class CreateProductDto {
    @ApiProperty({ example: '100', description: `price of product` })
    readonly price: number;

    @ApiProperty({ example: 'hat', description: 'title of product' })
    readonly title: string;

    @ApiProperty({ example: '1', description: 'id of type' })
    readonly typeId: number;

    @ApiProperty({ example: '120', description: 'count of product' })
    readonly count: number;

    readonly image: string;
}