import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/types";

export class AuthResponseDto {
   @ApiProperty({ example: 'e9ifwnjicvnvjv', description: 'auth token' })
   readonly token: string;

   @ApiProperty({ example: '1', description: 'user id' })
   readonly id: number;

   @ApiProperty({ example: '1', description: 'group id' })
   readonly groupId: number;

   @ApiProperty({ example: 'admin', description: 'user role' })
   readonly role: Role;

   @ApiProperty({ example: 'admin@mail.ru', description: 'user email' })
   readonly email: string;
}