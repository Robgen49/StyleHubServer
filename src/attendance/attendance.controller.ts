import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AttendanceService } from './attendance.service';
import { SetStudentAttendanceDto } from './dto/setStudentAttendance.dto';
import { Attendance } from './attendance.model';

@ApiTags('Attendance')
@Controller()
export class AttendanceController {
   constructor(private attendanceService: AttendanceService) { }
   @ApiOperation({ summary: 'Set student attendance mark for lesson' })
   @ApiResponse({ status: 201, description: 'Attendance', type: Attendance })
   @Post('/attendance/mark')
   setMark(@Body() setStudentAttendanceDto: SetStudentAttendanceDto) {
      return this.attendanceService.setAttendanceMark(setStudentAttendanceDto.mark, setStudentAttendanceDto.studentId, setStudentAttendanceDto.lessonId)
   }

   @ApiOperation({ summary: 'get all students Attendance by lesson' })
   @ApiResponse({ status: 200, description: 'students', type: [Attendance] })
   @Get('/attendance/lesson/:lessonId')
   @ApiParam({ name: 'lessonId', example: 1 })
   getLessonAttendance(@Param('lessonId') lessonId: number) {
      return this.attendanceService.getLessonAttendance(lessonId)
   }

   @ApiOperation({ summary: 'get student Attendance by all lessons' })
   @ApiResponse({ status: 200, description: 'students', type: [Attendance] })
   @Get('/attendance/student/:studentId')
   @ApiParam({ name: 'studentId', example: 1 })
   getStudentAttendance(@Param('studentId') studentId: number) {
      return this.attendanceService.getStudentAttendance(studentId)
   }

}


