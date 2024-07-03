import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Lesson } from 'src/lesson/lesson.model';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.model';
import { AttendanceController } from './attendance.controller';

@Module({
   controllers: [AttendanceController],
   providers: [AttendanceService],
   imports: [
      SequelizeModule.forFeature([User, Attendance, Lesson])
   ],
   exports: [
      AttendanceService
   ]
})
export class AttendanceModule { }
