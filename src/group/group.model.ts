import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Lesson } from "src/lesson/lesson.model";
import { User } from "src/users/users.model";

interface GroupCreationAttributes {
   name: string
}

@Table({ tableName: 'group' })
export class Group extends Model<Group, GroupCreationAttributes> {

   @HasMany(() => User)
   users: User[]

   @HasMany(() => Lesson)
   lessons: Lesson[]

   @ApiProperty({ example: '1', description: 'unique identificator' })
   @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   id: number;

   @ApiProperty({ example: 'VPR31', description: 'group name' })
   @Column({ type: DataType.STRING, unique: true, allowNull: false })
   name: string;
}