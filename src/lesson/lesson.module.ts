import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './lesson.model';
import { LessonService } from './lesson.service';
import { Group } from 'src/group/group.model';
import { LessonController } from './lesson.controller';
import { User } from 'src/users/users.model';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
   controllers: [
      LessonController
   ],
   providers: [LessonService],
   imports: [
      SequelizeModule.forFeature([Group, Lesson, User]),
      AttendanceModule,
      AuthModule
   ],
   exports: [
      LessonService
   ]
})
export class LessonModule {

}
