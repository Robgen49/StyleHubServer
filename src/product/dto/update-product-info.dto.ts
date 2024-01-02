import { ApiProperty } from "@nestjs/swagger";
import { CreateProductInfoDto } from "./create-product-info.dto";


export class UpdateProductInfoDto {

    @ApiProperty({ example: '1', description: 'product id' })
    readonly productId: number

    @ApiProperty({ example: [{ 'attributeId': '1', 'value': 'black' }, { 'attributeId': '2', 'value': 'big' }], description: 'product info' })
    readonly productInfo: [CreateProductInfoDto]
}