import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Attribute } from "src/attribute/attribute.model";
import { Product } from "src/product/product.model";

interface ProductInfoCreationAttributes {
    productId: number,
    attributeId: number,
    value: string
}

@Table({ tableName: 'product_info' })
export class ProductInfo extends Model<ProductInfo, ProductInfoCreationAttributes>{

    @BelongsTo(() => Product)
    product: Product

    @BelongsTo(() => Attribute)
    attribute: Attribute

    @ApiProperty({ example: '1', description: 'id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'id of product' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Product)
    productId: number;

    @ApiProperty({ example: '1', description: 'id of attribute' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Attribute)
    attributeId: number;

    @ApiProperty({ example: '1500', description: `value of attribute` })
    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    value: string;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'createdAt' })
    @CreatedAt
    @Column({ field: 'createdAt' })
    createdAt: Date;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'updatedAt' })
    @UpdatedAt
    @Column({ field: 'updatedAt' })
    updatedAt: Date;
}