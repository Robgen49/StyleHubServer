import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Group } from "src/group/group.model";
import { User } from "src/users/users.model";

interface LessonCreationAttributes {
   name: string
   time: string
   date: string
   place: string
   groupId: number
   teacherId: number
}

@Table({ tableName: 'lesson' })
export class Lesson extends Model<Lesson, LessonCreationAttributes> {

   @BelongsTo(() => Group)
   group: Group

   @BelongsTo(() => User)
   teacher: User

   @ApiProperty({ example: '1', description: 'Teacher identificator' })
   @ForeignKey(() => User)
   @Column({ type: DataType.INTEGER, allowNull: false })
   teacherId: number

   @ApiProperty({ example: '1', description: 'group identificator' })
   @ForeignKey(() => Group)
   @Column({ type: DataType.INTEGER })
   groupId: number

   @ApiProperty({ example: '1', description: 'unique identificator' })
   @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   id: number;

   @ApiProperty({ example: 'Math', description: 'lesson name' })
   @Column({ type: DataType.STRING, allowNull: false })
   name: string;

   @ApiProperty({ example: '18:00', description: 'lesson time' })
   @Column({ type: DataType.STRING, allowNull: false })
   time: string;

   @ApiProperty({ example: '2022-01-01', description: 'lesson date' })
   @Column({ type: DataType.STRING, allowNull: false })
   date: string;

   @ApiProperty({ example: '1-305', description: 'lesson place' })
   @Column({ type: DataType.STRING, allowNull: false })
   place: string;

   @ApiProperty({ example: 'SECRETCODE', description: 'lesson code' })
   @Column({ type: DataType.STRING, allowNull: true })
   code: string;

}