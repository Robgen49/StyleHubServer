import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Product } from "src/product/product.model";
import { User } from "src/users/users.model";

export interface RaintigCreationAttributes {
    userId: number;
    productId: number;
    value: number;
}

@Table({ tableName: 'raiting' })
export class Raiting extends Model<Raiting, RaintigCreationAttributes>{

    @BelongsTo(() => Product)
    product: Product

    @BelongsTo(() => User)
    user: User

    @ApiProperty({ example: '1', description: 'id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'id of user' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => User)
    userId: number;

    @ApiProperty({ example: '1', description: 'id of product' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Product)
    productId: number;

    @ApiProperty({ example: '5', description: 'role' })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false, validate: { min: 0, max: 5 } })
    value: number;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'createdAt' })
    @CreatedAt
    @Column({ field: 'createdAt' })
    createdAt: Date;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'updatedAt' })
    @UpdatedAt
    @Column({ field: 'updatedAt' })
    updatedAt: Date;
}