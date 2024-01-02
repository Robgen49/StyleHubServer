import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, HasOne, HasMany } from "sequelize-typescript";
import { Cart } from "src/cart/cart.model";
import { Order } from "src/order/order.model";
import { Raiting } from "src/raiting/raiting.model";
import { Role } from "src/types";

interface UserCreationAttributes {
    email: string;
    password: string;
    role: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes>{

    @HasOne(() => Cart)
    cart: Cart;

    @HasMany(() => Order)
    order: Order

    @HasMany(() => Raiting)
    raiting: Raiting

    @ApiProperty({ example: '1', description: 'unique identificator' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'mailing address' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'w`9@p#i._e^2DCZ', description: 'password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'admin', description: 'role' })
    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'customer' })
    role: Role;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'createdAt' })
    @CreatedAt
    @Column({ field: 'createdAt' })
    createdAt: Date;

    @ApiProperty({ example: '2023-12-16 13:47:59.252+03', description: 'updatedAt' })
    @UpdatedAt
    @Column({ field: 'updatedAt' })
    updatedAt: Date;

}