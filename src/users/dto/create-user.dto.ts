import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'mailing address' })
    readonly email: string;

    @ApiProperty({ example: 'w`9@p#i._e^2DCZ', description: 'password' })
    readonly password: string;
    
}