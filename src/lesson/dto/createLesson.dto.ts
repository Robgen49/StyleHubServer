import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
   @ApiProperty({ example: 'Math', description: 'Lesson name' })
   readonly name: string;

   @ApiProperty({ example: '10:00', description: 'Lesson time' })
   readonly time: string

   @ApiProperty({ example: '2022.10.10', description: 'Lesson date' })
   readonly date: string

   @ApiProperty({ example: '1-305', description: 'Lesson place' })
   readonly place: string

   @ApiProperty({ example: '1', description: 'Group id' })
   readonly groupId: number

   @ApiProperty({ example: '1', description: 'Teacher id' })
   readonly teacherId: number
}