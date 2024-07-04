import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.model';
import { CreateLessonDto } from './dto/createLesson.dto';
import { User } from 'src/users/users.model';
import { SecretCodeDto } from './dto/secretCode.dto';
import { ScanSecretCodeDto } from './dto/scanSecretCode.dto';
import { RoleGuard } from 'src/auth/role.guard';
import { AttendanceListDto } from './dto/attendanceList.dto';
import { GetTodayLessonsDto } from './dto/getTodayLessons.dto';

@ApiTags('Lesson')
@Controller()
export class LessonController {
   constructor(private lessonService: LessonService) { }
   @ApiOperation({ summary: 'Create lesson' })
   @ApiResponse({ status: 201, description: 'lesson', type: Lesson })
   @Post('/lesson')
   createLesson(@Body() lessonDto: CreateLessonDto) {
      return this.lessonService.createLesson(lessonDto)
   }

   @ApiOperation({ summary: 'Get absolutely all lessons' })
   @ApiResponse({ status: 200, description: 'lessons', type: [Lesson] })
   @Get('/lessons')
   getAll() {
      return this.lessonService.getAll()
   }

   @UseGuards(new RoleGuard("teacher"))
   @ApiOperation({ summary: 'Set secret code for lesson (only teacher (or admin) token - Authorization header reqiured!)' })
   @ApiResponse({ status: 201, description: 'lesson', type: Lesson })
   @Post('/lesson/code')
   setSecretCode(@Body() setSecretCodeDto: SecretCodeDto) {
      return this.lessonService.setSecretCode(setSecretCodeDto)
   }

   @UseGuards(new RoleGuard("teacher"))
   @ApiOperation({ summary: 'Get secret code for lesson (only teacher (or admin) token - Authorization header reqiured!)' })
   @ApiResponse({ status: 200, description: 'lesson id and secret code ', type: SecretCodeDto })
   @Get('/lesson/code/:lessonId')
   getSecretCode(@Param('lessonId') lessonId: number) {
      return this.lessonService.getSecretCode(lessonId)
   }

   @ApiOperation({ summary: 'Get today lessons' })
   @ApiResponse({ status: 200, description: 'lessons', type: [GetTodayLessonsDto] })
   @Get('/lessons/today/:email')
   @ApiParam({ name: 'email', example: 'user@mail.ru' })
   getTodayLessons(@Param('email') email: string) {
      return this.lessonService.getLessonsToday(email)
   }

   @ApiOperation({ summary: 'Get students by lesson (with marks)' })
   @ApiResponse({ status: 200, description: 'students', type: [AttendanceListDto] })
   @Get('/lessons/students/:lesson')
   @ApiParam({ name: 'lesson', example: 1 })
   getLessionStudents(@Param('lesson') lesson: number) {
      return this.lessonService.getStudentsInLessonWithMarks(lesson)
   }

   @ApiOperation({ summary: 'Scan the lesson code by student to set attendance mark' })
   @ApiResponse({ status: 201 })
   @Post('/lessons/sendScannedCode')
   sendScannedCode(@Body() scanSecretCodeDto: ScanSecretCodeDto) {
      return this.lessonService.scanSecretCode(scanSecretCodeDto)
   }

}


