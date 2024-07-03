import { ApiProperty } from "@nestjs/swagger";
import { AttendanceMark } from "src/types";


export class SetStudentAttendanceDto {
   @ApiProperty({ example: 1, description: 'number - student id' })
   readonly studentId: number;

   @ApiProperty({ example: 1, description: 'number - lesson id' })
   readonly lessonId: number;

   @ApiProperty({ example: 'Missed', description: 'string - attendance mark' })
   readonly mark: AttendanceMark
}