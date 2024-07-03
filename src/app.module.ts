import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from 'path'
import { GroupModule } from './group/group.module';
import { Group } from "./group/group.model";
import { Lesson } from "./lesson/lesson.model";
import { LessonModule } from "./lesson/lesson.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { Attendance } from "./attendance/attendance.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Group, Lesson, Attendance],
            autoLoadModels: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static')
        })
        ,
        UsersModule, AuthModule, GroupModule, LessonModule, AttendanceModule
    ]
})

export class AppModule {

}