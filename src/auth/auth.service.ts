import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService, private cartService: CartService) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {

        const guest = await this.usersService.getUserByEmail(userDto.email);
        if (guest) {
            throw new HttpException(`user with email '${userDto.email}' is already exist`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword})

        const token = await this.generateToken(user)
        this.cartService.createCart("Bearer " + token.token);

        return token
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

    private async validateUser(userDto: CreateUserDto) {
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
}