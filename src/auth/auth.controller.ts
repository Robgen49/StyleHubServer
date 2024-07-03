import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @ApiOperation({ summary: 'Get token and user' })
    @ApiResponse({ status: 201, description: 'token and user', type: AuthResponseDto })
    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
        return this.authService.login(userDto)
    }


    @ApiOperation({ summary: 'Create user and get token and user' })
    @ApiResponse({ status: 201, description: 'token and user', type: AuthResponseDto })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}


