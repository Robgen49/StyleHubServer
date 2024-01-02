import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, BelongsTo, HasOne, HasMany, ForeignKey } from "sequelize-typescript";
import { CartItem } from "src/cart-item/cart-item.model";
import { OrderItem } from "src/order-item/order-item.model";
import { ProductInfo } from "src/product_info/product_info.model";
import { Raiting } from "src/raiting/raiting.model";
import { Type } from "src/type/type.model";

interface ProductCreationAttributes {
    title: string;
    price: number;
    image: string;
    currentCount: number;
    typeId: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreationAttributes>{

    @HasOne(() => CartItem)
    cart: CartItem

    @HasOne(() => OrderItem)
    orderItem: OrderItem

    @HasMany(() => Raiting)
    raiting: Raiting

    @HasMany(() => ProductInfo)
    productInfo: ProductInfo

    @BelongsTo(() => Type)
    type: Type

    @ApiProperty({ example: '1', description: 'id of product' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '100', description: `price of product` })
    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @ApiProperty({ example: 'best hat ever', description: 'title of product' })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({ example: 'hat.img', description: 'image of product' })
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @ApiProperty({ example: '1', description: 'id of product' })
    @Column({ type: DataType.FLOAT, unique: false, defaultValue: 0, allowNull: false })
    AwerageRaiting: number;

    @ApiProperty({ example: '10', description: `id of type` })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Type)
    typeId: number

    @ApiProperty({ example: '10', description: `count of this product's exemplars` })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false, defaultValue: 3, validate: { min: 0 } })
    currentCount: number

    @ApiProperty({ example: '10', description: `count of this product's saled exemplars` })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false, defaultValue: 0 })
    saledCount: number

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'date of created' })
    @CreatedAt
    @Column({ field: 'createdAt' })
    createdAt: Date;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'date of update' })
    @UpdatedAt
    @Column({ field: 'updatedAt' })
    updatedAt: Date;
}