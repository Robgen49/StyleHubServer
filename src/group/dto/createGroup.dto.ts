import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
   @ApiProperty({ example: 'VRP31', description: 'Group name' })
   readonly name: string;
}