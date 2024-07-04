import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Lesson } from "./lesson.model";
import { CreateLessonDto } from "./dto/createLesson.dto";
import { Group } from "src/group/group.model";
import { User } from "src/users/users.model";
import { SecretCodeDto } from "./dto/secretCode.dto";
import { AttendanceService } from "src/attendance/attendance.service";
import { ScanSecretCodeDto } from "./dto/scanSecretCode.dto";
import { AuthService } from "src/auth/auth.service";
import { Cron } from "@nestjs/schedule";
import { formatDateToString } from "src/utils/formatDateToString";

@Injectable()
export class LessonService {

   constructor(
      @InjectModel(Lesson) private lessonTable: typeof Lesson,
      @InjectModel(Group) private groupTable: typeof Group,
      @InjectModel(User) private userTable: typeof User,
      private attendanceService: AttendanceService,
      private authService: AuthService,
   ) { }

   async getAll(): Promise<Lesson[]> {
      return await this.lessonTable.findAll();
   }

   async setSecretCode(setSecretCodeDto: SecretCodeDto) {
      try {

         const required = []
         if (!setSecretCodeDto?.lessonId) {
            required.push('lessonId')
         }
         if (!setSecretCodeDto?.code) {
            required.push('code')
         }
         if (required.length > 0) {
            throw new HttpException(`Missed required fields: ${required.join(', ')}`, HttpStatus.BAD_REQUEST)
         }

         const lesson = await this.lessonTable.findByPk(setSecretCodeDto.lessonId)
         if (!lesson) {
            throw new HttpException('Lesson with id ' + setSecretCodeDto.lessonId + ' not found', HttpStatus.BAD_REQUEST)
         }
         if (setSecretCodeDto.code.length === 0) {
            throw new HttpException('Code is required (you send empty string)', HttpStatus.BAD_REQUEST)
         }
         return await this.lessonTable.update({ code: setSecretCodeDto.code }, { where: { id: setSecretCodeDto.lessonId } })

      } catch (e) {
         throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
      }
   }

   async getSecretCode(lessonId: number) {
      try {
         if (!lessonId) {
            throw new HttpException('Lesson id is required', HttpStatus.BAD_REQUEST)
         }
         const lesson = await this.lessonTable.findByPk(lessonId)
         if (!lesson) {
            throw new HttpException('Lesson with id ' + lessonId + ' not found', HttpStatus.BAD_REQUEST)
         }
         return { lessoinId: lesson.id, code: lesson.code }
      } catch (e) {
         throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
      }
   }

   async createLesson(lessonDto: CreateLessonDto) {
      const required = []

      if (!lessonDto?.groupId) {
         required.push('groupId')
      }

      if (!lessonDto?.name) {
         required.push('name')
      }

      if (!lessonDto?.time) {
         required.push('time')
      }

      if (!lessonDto?.date) {
         required.push('date')
      }

      if (!lessonDto?.place) {
         required.push('place')
      }

      if (!lessonDto?.teacherId) {
         required.push('teacherId')
      }

      if (required.length > 0) {
         throw new HttpException(`Missed required fields: ${required.join(', ')}`, HttpStatus.BAD_REQUEST)
      }

      if (!await this.groupTable.findByPk(lessonDto.groupId)) {
         throw new HttpException('Group with id ' + lessonDto.groupId + ' not found', HttpStatus.BAD_REQUEST)
      }

      const teacher = await this.userTable.findByPk(lessonDto.teacherId)

      if (!teacher) {
         throw new HttpException('User(teacher) with id ' + lessonDto.teacherId + ' not found', HttpStatus.BAD_REQUEST)
      }

      if (teacher.role !== 'teacher') {
         throw new HttpException('User with id ' + lessonDto.teacherId + ' is not a teacher, he is just a(an) ' + teacher.role + '', HttpStatus.BAD_REQUEST)
      }

      if (lessonDto.date.split('.')[0].length !== 4 || lessonDto.date.split('.')[1].length !== 2 || lessonDto.date.split('.')[2].length !== 2) {
         throw new HttpException('Incorrect date format (please send date in format yyyy.mm.dd)', HttpStatus.BAD_REQUEST)
      }

      // if (new Date(lessonDto.date) < new Date()) {
      //    throw new HttpException('Lesson date must be in future (today is ' + new Date().toDateString() + ', but you send ' + new Date(lessonDto.date).toDateString() + ')', HttpStatus.BAD_REQUEST)
      // }

      const lesson = await this.lessonTable.create(lessonDto);
      return lesson;
   }

   async getLessonsToday(email: string) {
      if (!email) {
         throw new HttpException('User email is required', HttpStatus.BAD_REQUEST)
      }

      const user = (await this.userTable.findOne({ where: { email: email } }))

      if (!user) {
         throw new HttpException(`User with mail ${email} not found`, HttpStatus.BAD_REQUEST)
      }

      const formattedDate = new Date().toLocaleDateString().split('.').sort((a, b) => b.length - a.length - 1).join('.');


      if (user.role === 'teacher') {
         return await this.lessonTable.findAll({ where: { teacherId: user.id, date: formattedDate } })
      }

      if (user.role === 'student') {
         const group = await this.groupTable.findByPk(user.groupId)
         const lessons = await this.lessonTable.findAll({ where: { groupId: user.groupId, date: formattedDate } })
         const userAttendaceToday = (await this.attendanceService.getStudentAttendance(user.id)).filter(attendance => lessons.find(lesson => lesson.id === attendance.lessonId))
         const res = lessons.map(lesson => {
            return {
               lessonId: lesson.id,
               userId: user.id,
               userEmail: user.email,
               lessonDate: lesson.date,
               lessonTime: lesson.time,
               groupId: lesson.groupId,
               teacherId: lesson.teacherId,
               gropName: group.name,
               lessonName: lesson.name,
               place: lesson.place,
               mark: userAttendaceToday.find(attendance => attendance.lessonId === lesson.id)?.mark || null
            }
         })
         return res
      }

      if (user.role === 'admin') {
         throw new HttpException(`Admins don't have lessons! (you sent admin email: ${email})`, HttpStatus.BAD_REQUEST)
      }
   }

   async getStudentsInLesson(lessonId: number) {
      const lesson = await this.lessonTable.findByPk(lessonId)
      const groupId = (await this.groupTable.findByPk(lesson.groupId)).id
      return await this.userTable.findAll({ where: { groupId: groupId, role: 'student' } })
   }

   async scanSecretCode(scanSecretCodeDto: ScanSecretCodeDto) {
      const userRole = this.authService.getUserRole('Bearer ' + scanSecretCodeDto.token)
      if (userRole !== 'student') {
         throw new HttpException('this is not a student token', HttpStatus.BAD_REQUEST)
      }
      const userId = this.authService.getUserId('Bearer ' + scanSecretCodeDto.token)

      const currentCode = (await this.getSecretCode(scanSecretCodeDto.lessonId)).code
      if (scanSecretCodeDto.code === currentCode) {
         this.attendanceService.setAttendanceMark('Visited', userId, scanSecretCodeDto.lessonId)
         return { message: 'Visited' }
      }
      else {
         return { message: 'code is not correct' }
      }
   }

   async getStudentsInLessonWithMarks(lessoinId: number) {
      const lesson = await this.lessonTable.findByPk(lessoinId)
      const marks = await this.attendanceService.getLessonAttendance(lessoinId);
      const students = await this.getStudentsInLesson(lessoinId);
      return students.map(student => {
         return {
            mark: marks.find(mark => mark.userId === student.id)?.mark ?? null,
            studentId: student.id,
            email: student.email,
            groupId: student.groupId
         }
      })
   }


   @Cron('10 * * * * *')
   handleCron() {
      const date = formatDateToString(new Date());
      this.lessonTable.findAll()
         .then((lessons) => {
            lessons.map(lesson => {
               this.getStudentsInLessonWithMarks(lesson.id)
                  .then(students => {
                     students.map((student) => {
                        if (student.mark === null) {
                           if (lesson.date === date) {
                              if (+lesson.time.slice(0, 2) + 2 <= +(new Date()).toTimeString().slice(0, 2)) {
                                 this.attendanceService.setAttendanceMark('Missed', student.studentId, lesson.id)
                              }
                           }
                           if (lesson.date < date) {
                              this.attendanceService.setAttendanceMark('Missed', student.studentId, lesson.id)
                           }
                        }
                     })

                  })

            })
         })
   }
}
