import { ApiProperty } from "@nestjs/swagger";
import { AttendanceMark } from "src/types";

export class AttendanceListDto {
   @ApiProperty({ example: 'Visited', description: 'Mark (Visited | Missed | null)' })
   readonly mark: AttendanceMark;

   @ApiProperty({ example: 1, description: 'student Id (number)' })
   readonly studentId: number

   @ApiProperty({ example: 'jamal@mail.ru', description: 'student email (string)' })
   readonly email: string

   @ApiProperty({ example: 1, description: 'group Id (number)' })
   readonly groupId: number
}