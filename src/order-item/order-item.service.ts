import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './order-item.model';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { CartItem } from 'src/cart-item/cart-item.model';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectModel(OrderItem) private orderItemTable: typeof OrderItem,
        private cartItemService: CartItemService,
        private productService: ProductService
    ) { }

    async createOrderItems(token: string, orderId: number) {
        const cartItems = await this.cartItemService.getCartItems(token);
        const orderItems = []
        cartItems.forEach(async (cartItem: CartItem) => {
            const productId = cartItem.dataValues.productId
            const count = cartItem.dataValues.count
            const orderItem = await this.orderItemTable.create({ orderId: orderId, productId: productId, count: count })
            const oldCount = (await this.productService.getProductById(productId)).product.currentCount
            await this.productService.updateProductCount({ id: productId, count: oldCount - count })
            orderItems.push(orderItem)
        })
        await this.cartItemService.clearCartItems(token)
        return orderItems
    }

    async getOrderItems(orderId: number) {
        const orderItems = await this.orderItemTable.findAll({ where: { orderId: orderId } })
        return orderItems
    }

    async getAllOrderItems() {
        const orderItems = await this.orderItemTable.findAll()
        return orderItems
    }
}