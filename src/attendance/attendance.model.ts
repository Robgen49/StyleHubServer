import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Lesson } from "src/lesson/lesson.model";
import { AttendanceMark } from "src/types";
import { User } from "src/users/users.model";

interface AttendanceCreationAttributes {
   userId: number
   lessonId: number
   mark: AttendanceMark
}

@Table({ tableName: 'attendance' })
export class Attendance extends Model<Attendance, AttendanceCreationAttributes> {

   @BelongsTo(() => Lesson)
   lesson: Lesson

   @BelongsTo(() => User)
   user: User

   @ApiProperty({ example: '1', description: 'unique user identificator' })
   @Column({ type: DataType.INTEGER })
   @ForeignKey(() => User)
   userId: number

   @ApiProperty({ example: '1', description: 'unique lesson identificator' })
   @Column({ type: DataType.INTEGER })
   @ForeignKey(() => Lesson)
   lessonId: number

   @ApiProperty({ example: 'Missed', description: 'attendance mark' })
   @Column({ type: DataType.STRING, allowNull: false })
   mark: string

   @ApiProperty({ example: '1', description: 'unique identificator' })
   @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   id: number;
}