import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart-item.model';
import { CartService } from 'src/cart/cart.service';
import { AuthService } from 'src/auth/auth.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartItemService {

    constructor(
        @InjectModel(CartItem) private cartItemsTable: typeof CartItem,
        private cartService: CartService,
        private productService: ProductService,
        private authService: AuthService
    ) { }

    async getCartItems(token: string) {
        const cartId = this.authService.getUserId(token)
        const cartItems = await this.cartItemsTable.findAll({ where: { cartId: cartId } })
        return cartItems
    }

    async getCartSum(token: string) {
        const sum = await this.getSum(token)
        return { sum: sum }
    }

    async getCartItemsByProductId(token: string, productId: number) {
        const cartId = this.authService.getUserId(token)
        const cartItem = await this.cartItemsTable.findOne({ where: { cartId: cartId, productId: productId } })
        return cartItem
    }

    async getSum(token: string) {
        const userId = this.authService.getUserId(token)
        const cartItems = await this.cartItemsTable.findAll({ where: { cartId: userId } })
        let sum = 0
        for (let index = 0; index < cartItems.length; index++) {
            const cartItem: CartItem = cartItems[index]
            const price = (await this.productService.getProductById(cartItem.productId)).product.price
            sum += price * cartItem.count
        }
        return sum
    }

    async updateCartItems(token: string, productId: number, count: number) {
        const cartId = this.authService.getUserId(token)
        const productInfo = await this.productService.getProductById(productId)
        const absoluteCount = productInfo.product.currentCount
        if (count <= absoluteCount) {
            if (await this.cartItemsTable.findOne({ where: { cartId: cartId, productId: productId } })) {
                const cartItems = await this.cartItemsTable.update({ count: count }, { where: { cartId: cartId, productId: productId, } })
                await this.cartService.resetCart(token, await this.getSum(token))
                return cartItems
            }
            else {
                const cartItems = await this.cartItemsTable.create({ cartId: cartId, productId: productId, count: count })
                await this.cartService.resetCart(token, await this.getSum(token))
                return cartItems
            }
        }
        throw new HttpException(`there are only ${absoluteCount} exemplars of ${productId}, but requested ${count}`, HttpStatus.BAD_REQUEST)
    }

    async deleteCartItem(token: string, productId: number) {
        const cartId = this.authService.getUserId(token)
        if (await this.cartItemsTable.findOne({ where: { cartId: cartId, productId: productId } })) {
            const count = (await this.cartItemsTable.findOne({ where: { cartId: cartId, productId: productId } })).count
            const price = (await this.productService.getProductById(productId)).product.price
            await this.cartService.resetCart(token, await this.getSum(token) - count * price)
            await this.cartItemsTable.destroy({ where: { cartId: cartId, productId: productId } })
        }
        else throw new HttpException(`product with id ${productId} is not exist in cart`, HttpStatus.BAD_REQUEST)
    }

    async clearCartItems(token: string) {
        const cartId = this.authService.getUserId(token)
        await this.cartItemsTable.destroy({ where: { cartId: cartId } })
        await this.cartService.resetCart(token, 0)
        console.log('reseted')
    }
}