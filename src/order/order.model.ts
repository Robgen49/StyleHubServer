import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, HasMany, BelongsTo, CreatedAt } from "sequelize-typescript";
import { OrderItem } from "src/order-item/order-item.model";
import { User } from "src/users/users.model";

interface OrderCreationAttributes {
    userId: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttributes>{

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => OrderItem)
    orderItem: OrderItem

    @ApiProperty({ example: '1', description: 'id of order' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'id of cart' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => User)
    userId: number;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'order completion date' })
    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    completedAt: string;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'order creation date' })
    @CreatedAt
    @Column({ type: DataType.DATE, unique: false, allowNull: false })
    createdAt: string;
}