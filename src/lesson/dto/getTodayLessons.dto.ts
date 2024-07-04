import { ApiProperty } from "@nestjs/swagger";
import { AttendanceMark } from "src/types";

export class GetTodayLessonsDto {

   @ApiProperty({ example: 1, description: 'User id' })
   readonly userId: number

   @ApiProperty({ example: '2022-01-01', description: 'Lesson date' })
   readonly lessonDate: Date

   @ApiProperty({ example: '10:00', description: 'Lesson time' })
   readonly lessonTime: Date

   @ApiProperty({ example: 1, description: 'Group id' })
   readonly groupId: number

   @ApiProperty({ example: 1, description: 'Teacher id' })
   readonly teacherId: number

   @ApiProperty({ example: 'Group name', description: 'Group name' })
   readonly groupName: string

   @ApiProperty({ example: 'Lesson name', description: 'Lesson name' })
   readonly lessonName: string

   @ApiProperty({ example: '1-305', description: 'Place' })
   readonly place: string

   @ApiProperty({ example: '1', description: 'Mark (always null for teachers)' })
   readonly mark: AttendanceMark

}