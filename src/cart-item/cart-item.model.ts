import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, HasOne, BelongsTo } from "sequelize-typescript";
import { Cart } from "src/cart/cart.model";
import { Product } from "src/product/product.model";

interface CartItemCreationAttributes {
    cartId: number;
    productId: number;
    count: number
}

@Table({ tableName: 'cart_item' })
export class CartItem extends Model<CartItem, CartItemCreationAttributes>{
    @BelongsTo(() => Cart)
    cart: Cart

    @BelongsTo(() => Product)
    product: Product

    @ApiProperty({ example: '1', description: 'id of cart-item' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'id of cart' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Cart)
    cartId: number;

    @ApiProperty({ example: '1', description: 'id of product' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Product) 
    productId: number

    @ApiProperty({ example: '10', description: `count of product's in cart` })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false, validate: { min: 0 } })
    count: number
}