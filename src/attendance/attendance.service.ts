import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Attendance } from "./attendance.model";
import { AttendanceMark } from "src/types";

@Injectable()
export class AttendanceService {

   constructor(@InjectModel(Attendance) private attendanceTable: typeof Attendance) { }

   async getAll(): Promise<Attendance[]> {
      return await this.attendanceTable.findAll();
   }

   async setAttendanceMark(mark: AttendanceMark, studentId: number, lessonId: number) {
      const attendance = await this.attendanceTable.findOne({ where: { lessonId: lessonId, userId: studentId } })
      if (!attendance) {
         return await this.attendanceTable.create({ mark: mark, lessonId: lessonId, userId: studentId })
      }
      return await this.attendanceTable.update({ mark: mark }, { where: { userId: studentId, lessonId: lessonId } })
   }

   async getLessonAttendance(lessonId: number) {
      return await this.attendanceTable.findAll({ where: { lessonId: lessonId } });
   }

   async getStudentAttendance(studentId: number) {
      return await this.attendanceTable.findAll({ where: { userId: studentId } });
   }

}