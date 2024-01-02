import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userTable: typeof User) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userTable.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userTable.findAll();
        return users;
    }

    async getUserByEmail(email: string) {
        const users = await this.userTable.findOne({ where: { email: email } });
        return users;
    }

    async updateUserById(id: number, dto: CreateUserDto) {
        await this.userTable.update(dto, { where: { id: id } })
    }
    
    async updateUserByEmail(email: string, dto: CreateUserDto) {
        await this.userTable.update(dto, { where: { email: email } })
    }

    async deleteUserByEmail(email: string) {
        await this.userTable.destroy({ where: { email: email } })
    }
}
