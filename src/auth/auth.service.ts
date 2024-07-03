import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from 'src/group/group.model';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService, @InjectModel(Group) private groupTable: typeof Group) { }

    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    getUserId(token: string) {
        return (new JwtService()).decode(token.split(' ')[1]).id
    }

    getUserEmail(token: string) {
        return (new JwtService()).decode(token.split(' ')[1]).email
    }

    getUserRole(token: string) {
        return (new JwtService()).decode(token.split(' ')[1]).role
    }

    private async validateUser(userDto: AuthUserDto) {
        try {
            const user = await this.usersService.getUserByEmail(userDto.email)
            const passwordEquals = await bcrypt.compare(userDto.password, user.password)
            if (passwordEquals)
                return user
            else throw new UnauthorizedException({ message: 'Uncorrect email or password' })
        } catch (error) {
            throw new UnauthorizedException({ message: 'Uncorrect email or password' })
        }
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, role: user.role }
        return { token: this.jwtService.sign(payload) }
    }

    async registration(userDto: CreateUserDto) {

        const required = []

        if (!userDto?.email) {
            required.push('email')
        }

        if (!userDto?.password) {
            required.push('password')
        }

        if (!userDto?.role) {
            required.push('role')
        }

        if (userDto?.role === 'student' && !userDto?.groupId) {
            required.push('groupId')
        }

        if (required.length > 0) {
            throw new HttpException(`Missed required fields: ${required.join(', ')}`, HttpStatus.BAD_REQUEST)
        }

        if (userDto?.role === 'student') {
            if (!await this.groupTable.findByPk(userDto.groupId)) {
                throw new HttpException(`Group with id '${userDto.groupId}' is not exist`, HttpStatus.BAD_REQUEST)
            }
        }

        if (userDto?.role !== 'student' && userDto?.groupId) {
            throw new HttpException(`Wrong role for group (${userDto?.role}'s don't have groups)`, HttpStatus.BAD_REQUEST)
        }

        const guest = await this.usersService.getUserByEmail(userDto.email);
        if (guest) {
            throw new HttpException(`user with email '${userDto.email}' is already exist`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword })

        const token = await this.generateToken(user)

        return token
    }

}