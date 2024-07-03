import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Group } from './group.model';
import { Lesson } from 'src/lesson/lesson.model';
import { GroupController } from './group.controller';

@Module({
   controllers: [GroupController],
   providers: [GroupService],
   imports: [
      SequelizeModule.forFeature([User, Group, Lesson])
   ],
   exports: [
      GroupService
   ]
})
export class GroupModule { }
