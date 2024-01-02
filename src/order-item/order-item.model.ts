import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Model, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { Product } from "src/product/product.model";

interface OrderItemCreationAttributes {
    productId: number;
    orderId: number;
    count: number;
}

@Table({ tableName: 'order_item' })
export class OrderItem extends Model<OrderItem, OrderItemCreationAttributes>{

    @BelongsTo(() => Order)
    order: Order;

    @BelongsTo(() => Product)
    product: Product

    @ApiProperty({ example: '1', description: 'id of order-item' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'id of product' })
    @Column({ type: DataType.INTEGER, unique: false })
    @ForeignKey(() => Product)
    productId: number;

    @ApiProperty({ example: '1', description: 'id of order' })
    @Column({ type: DataType.INTEGER, unique: false })
    @ForeignKey(() => Order)
    orderId: number
 
    @ApiProperty({ example: '10', description: 'count of ordered products' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false, validate: { min: 0 }  })
    count: number 
}