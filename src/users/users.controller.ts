import { Body, Controller, Post, Get, Put, Param, UseGuards, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { RoleGuard } from 'src/auth/role.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService) { }

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Get user by email' })
    @ApiResponse({ status: 200, type: [User] })
    @ApiParam({
        name: 'email',
        example: '/users/example@mail.com'
    })
    @Get(':email')
    @UseGuards(new RoleGuard("admin"))
    getByEmail(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @UseGuards(new RoleGuard("admin"))
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Update user by id' })
    @ApiResponse({ status: 200, description: 'void' })
    @Put('/id/:id')
    @ApiParam({ name: 'id', example: '/users/1' })
    @UseGuards(new RoleGuard("admin"))
    updateById(
        @Param('id') id: number,
        @Body() userDto: CreateUserDto) {
        return this.userService.updateUserById(id, userDto)
    }

    @ApiOperation({ summary: 'Update user by email' })
    @ApiResponse({ status: 200, description: 'void' })
    @ApiParam({ name: 'email', example: '/users/email@mail.ru' })
    @Put('/email/:email')
    @UseGuards(new RoleGuard("admin"))
    updateByEmail(
        @Param('email') email: string,
        @Body() userDto: CreateUserDto) {
        return this.userService.updateUserByEmail(email, userDto)
    }

    @ApiOperation({ summary: 'Delete user by email' })
    @ApiResponse({ status: 200, description: 'void' })
    @ApiParam({ name: 'email', example: '/users/email@mail.ru' })
    @Delete("/:email")
    @UseGuards(new RoleGuard("admin"))
    delete(@Param('email') email: string) {
        return this.userService.deleteUserByEmail(email)
    }
}
