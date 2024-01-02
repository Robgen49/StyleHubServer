import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../product.model";
import { ProductInfo } from "src/product_info/product_info.model";

export class GetProductInfoDto {

    @ApiProperty({ type: Product })
    readonly product: Product;

    @ApiProperty({ type: [ProductInfo] })
    readonly productInfoArray: ProductInfo[]

}