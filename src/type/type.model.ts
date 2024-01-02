import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Attribute } from "src/attribute/attribute.model";
import { Product } from "src/product/product.model";

export interface TypeCreationAttributes {
    name: string;
}

@Table({ tableName: 'type' })
export class Type extends Model<Type, TypeCreationAttributes>{

    @HasMany(() => Attribute)
    attribute: Attribute

    @HasMany(() => Product)
    product: Product

    @ApiProperty({ example: '1', description: 'id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'cars', description: 'name of type' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'createdAt' })
    @CreatedAt 
    @Column({ field: 'createdAt' })
    createdAt: Date;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'updatedAt' })
    @UpdatedAt
    @Column({ field: 'updatedAt' })
    updatedAt: Date;
}