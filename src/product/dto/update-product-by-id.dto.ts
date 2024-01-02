import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {

    @ApiProperty({ example: '1', description: 'id of product' })
    readonly id: number;

    @ApiProperty({ example: '100', description: `price of product` })
    readonly price: number;

    @ApiProperty({ example: 'hat', description: 'title of product' })
    readonly title: string;

    @ApiProperty({ example: '1', description: 'id of type' })
    readonly typeId: number;

    @ApiProperty({ example: '120', description: 'count of product' })
    readonly count: number;

    @ApiProperty({ example: 'https://images.asos-media.com/products/adidas-originals-samba-og-trainers-in-white/205079776-1-white?$n_640w$&wid=513&fit=constrain', description: 'href to image' })
    readonly image: string;
}