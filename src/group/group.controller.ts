import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/createGroup.dto';

@ApiTags('Group')
@Controller()
export class GroupController {
   constructor(private groupService: GroupService) { }
   @ApiOperation({ summary: 'Create group' })
   @ApiResponse({ status: 201, description: 'group' })
   @Post('/group')
   createGroup(@Body() groupDto: CreateGroupDto) {
      return this.groupService.createGroup(groupDto)
   }

   @ApiOperation({ summary: 'Get all groups' })
   @ApiResponse({ status: 201, description: 'groups' })
   @Get('/groups')
   getAll() {
      return this.groupService.getAll()
   }
}


