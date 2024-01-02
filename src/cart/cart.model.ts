import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, ForeignKey, HasOne, BelongsTo, HasMany } from "sequelize-typescript";
import { CartItem } from "src/cart-item/cart-item.model";
import { Order } from "src/order/order.model";
import { User } from "src/users/users.model";

interface CartCreationAttributes {
    userId: number
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartCreationAttributes>{

    @BelongsTo(() => User)
    user: User

    @HasMany(() => CartItem)
    cartItem: CartItem

    @ApiProperty({ example: '1', description: 'id of cart' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'id of user' })
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    @ForeignKey(() => User)
    userId: number;

    @ApiProperty({ example: '1500', description: `sum of cart` })
    @Column({ type: DataType.INTEGER, defaultValue: 0, validate: { min: 0 } })
    sum: number;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'createdAt' })
    @CreatedAt
    @Column({ field: 'createdAt' })
    createdAt: Date;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'updatedAt' })
    @UpdatedAt
    @Column({ field: 'updatedAt' })
    updatedAt: Date;
}