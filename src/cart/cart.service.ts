import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartService {

    private authService: AuthService = new AuthService(new UsersService(User), new JwtService(), this);

    constructor(@InjectModel(Cart) private cartTable: typeof Cart) { }

    async createCart(authorization: string) {

        const userId = this.authService.getUserId(authorization)

        if (!(await this.cartTable.findOne({ where: { userId: userId } }))) {
            const cart = await this.cartTable.create({ userId: userId })
            return cart
        }

        else {
            throw new HttpException(`user with id ${userId} already has a cart`, HttpStatus.BAD_REQUEST)
        }
    }

    async resetCart(authorization: string, sum?: number) {
        if (typeof sum === undefined) {
            sum = 0
        }
        const userId = this.authService.getUserId(authorization)
        console.log('reset')
        await this.cartTable.update({ sum: sum }, { where: { userId: userId } })
    }

    async getCartSum(id: number) {
        const sum = (await this.cartTable.findOne({ where: { id: id } })).sum
        return sum
    }

    async updateSum(authorization: string, sum: number) {
        const userId = this.authService.getUserId(authorization)
        const cart = await this.cartTable.findOne({ where: { userId: userId } })
        const updatedCart = await this.cartTable.update({ sum: cart.sum + sum }, { where: { userId: userId } })
        return updatedCart
    }

}
