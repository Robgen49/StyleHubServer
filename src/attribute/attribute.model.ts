
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ProductInfo } from "src/product_info/product_info.model";
import { Type } from "src/type/type.model";

interface AttributeCreationAttributes {
    typeId: number;
    name: string;
}

@Table({ tableName: 'attribute' })
export class Attribute extends Model<Attribute, AttributeCreationAttributes>{

    @BelongsTo(() => Type)
    type: Type

    @HasMany(() => ProductInfo)
    productInfo: ProductInfo

    @ApiProperty({ example: '1', description: 'id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'id of type' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => Type)
    typeId: number;

    @ApiProperty({ example: '1500', description: `name of attribute` })
    @Column({ type: DataType.STRING, allowNull: false })
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