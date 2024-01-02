import { Controller, Get, Headers, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { RoleGuard } from 'src/auth/role.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.model';
import { OrderItem } from 'src/order-item/order-item.model';

@ApiTags('Order')
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) { }

    @ApiOperation({ summary: 'Create order' })
    @ApiResponse({ status: 201, type: Order })
    @ApiParam({ name: 'authorization', description: 'token' })
    @UseGuards(new RoleGuard('customer'))
    @Post()
    createOrder(@Headers('authorization') token: string) {
        return this.orderService.createOrder(token)
    }

    @ApiOperation({ summary: 'Complete order' })
    @ApiResponse({ status: 200, description: 'void' })
    @ApiParam({ name: 'id', example: '/order/1' })
    @UseGuards(new RoleGuard('collector'))
    @Put('/:id')
    completeOrderById(@Param('id') orderId: number) {
        return this.orderService.completeOrderById(orderId)
    }



    @ApiOperation({ summary: 'Get orders' })
    @ApiResponse({ status: 200, type: [Order] })
    @UseGuards(new RoleGuard('collector'))
    @Get()
    getOrders() {
        return this.orderService.getOrders()
    }

    @ApiOperation({ summary: 'Get my orders' })
    @ApiResponse({ status: 200, type: [Order] })
    @UseGuards(new RoleGuard('customer'))
    @ApiParam({ name: 'authorization', description: 'token' })
    @Get('/user')
    getMyOrders(@Headers('authorization') token: string) {
        return this.orderService.getMyOrders(token)
    }

    @ApiOperation({ summary: 'Get all order items' })
    @ApiResponse({ status: 200, type: [OrderItem] })
    @UseGuards(new RoleGuard('collector'))
    @Get('/items')
    getAllOrderItems() {
        return this.orderService.getAllOrderItems()
    }

    @ApiOperation({ summary: 'Get order items' })
    @ApiResponse({ status: 200, type: [OrderItem] })
    @ApiParam({ name: 'id', example: '/order/1' })
    @UseGuards(new RoleGuard('collector'))
    @Get('/:id')
    getOrderItems(@Param('id') orderId: number) {
        return this.orderService.getOrderItems(orderId)
    }
}