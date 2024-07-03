import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/types";


export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'mailing address' })
    readonly email: string;

    @ApiProperty({ example: 'w`9@p#i._e^2DCZ', description: 'password' })
    readonly password: string;

    @ApiProperty({ example: 'admin', description: 'user role' })
    readonly role: Role;

    @ApiProperty({ example: '1', description: 'group id' })
    readonly groupId: number

}