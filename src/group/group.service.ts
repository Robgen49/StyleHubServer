import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Group } from "./group.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGroupDto } from "./dto/createGroup.dto";

@Injectable()
export class GroupService {

   constructor(@InjectModel(Group) private groupTable: typeof Group) { }

   async getAll(): Promise<Group[]> {
      return await this.groupTable.findAll();
   }

   async createGroup(groupDto: CreateGroupDto) {
      if (!groupDto?.name) {
         throw new HttpException('Group name is required', HttpStatus.BAD_REQUEST)
      }
      const group = await this.groupTable.create(groupDto);
      return group;
   }

}