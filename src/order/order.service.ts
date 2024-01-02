import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { AuthService } from 'src/auth/auth.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { ProductService } from 'src/product/product.service';
import { OrderItem } from 'src/order-item/order-item.model';
import { CartItem } from 'src/cart-item/cart-item.model';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order) private orderTable: typeof Order,
        private authService: AuthService,
        private orderItemsService: OrderItemService,
        private cartItemsService: CartItemService,
        private productService: ProductService
    ) { }

    async createOrder(token: string) {
        const userId = this.authService.getUserId(token)
        const cartItems = await this.cartItemsService.getCartItems(token)
        cartItems.forEach(async (cartItem: CartItem) => {
            const productCount = (await this.productService.getProductById(cartItem.productId)).product.currentCount
            if (cartItem.count > productCount) {
                throw new HttpException(`there are only ${productCount} products with id ${cartItem.productId}, but requested ${cartItem.count}`, HttpStatus.BAD_REQUEST)
            }
        })
        const order = await this.orderTable.create({ userId: userId })
        const orderItems = await this.orderItemsService.createOrderItems(token, order.id)

        return [order, orderItems]
    }

    async completeOrderById(orderId: number) {
        const orderItems = await this.orderItemsService.getOrderItems(orderId)
        orderItems.forEach(async (orderItem: OrderItem) => {
            const saled = (await this.productService.getProductById(orderItem.productId)).product.saledCount
            await this.productService.updateProductSaled({ id: orderItem.productId, saled: saled + orderItem.count })
        })
        const updatedOrder = await this.orderTable.update({ completedAt: (new Date()).toISOString() }, { where: { id: orderId } })
        return updatedOrder
    }

    async getMyOrders(token: string) {
        const userId = await this.authService.getUserId(token)
        const orders = await this.orderTable.findAll({ where: { userId: userId } })
        return orders
    }

    async getOrders() {
        const orders = await this.orderTable.findAll()
        return orders
    }

    async getAllOrderItems() {
        const orderItems = await this.orderItemsService.getAllOrderItems()
        return orderItems
    }

    async getOrderItems(orderId: number) {
        const orderItems = await this.orderItemsService.getOrderItems(orderId)
        return orderItems
    }
}
