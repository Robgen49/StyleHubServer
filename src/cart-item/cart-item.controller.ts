import { Body, Controller, Delete, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItemService } from './cart-item.service';
import { RoleGuard } from 'src/auth/role.guard';
import { CountObject, CartSum } from 'src/types';
import { CartItem } from './cart-item.model';


@ApiTags('Cart')
@Controller('cart-item')
export class CartItemController {
    constructor(private cartItemService: CartItemService) { }

    @ApiOperation({ summary: 'Get cart-items' })
    @ApiResponse({ status: 200, type: [CartItem] })
    @ApiParam({ name: 'authorization', description: 'token' })
    @UseGuards(new RoleGuard('customer'))
    @Get()
    getCartItems(@Headers('authorization') authorization: string) {
        return this.cartItemService.getCartItems(authorization)
    }

    @ApiOperation({ summary: 'Get cart sum' })
    @ApiResponse({ status: 200, type: CartSum })
    @ApiParam({ name: 'authorization', description: 'token' })
    @UseGuards(new RoleGuard('customer'))
    @Get('/sum')
    getCartSum(@Headers('authorization') authorization: string) {
        return this.cartItemService.getCartSum(authorization)
    }

    @ApiOperation({ summary: 'Get cart-item by product id' })
    @ApiResponse({ status: 200, type: CartItem })
    @ApiParam({ name: 'authorization', description: 'token' })
    @ApiParam({ name: 'productId', example: '/cart-item/1' })
    @UseGuards(new RoleGuard('customer'))
    @Get('/:productId')
    getCartItemById(
        @Headers('authorization') authorization: string,
        @Param('productId') productId: number,
    ) {
        return this.cartItemService.getCartItemsByProductId(authorization, productId)
    }

    @ApiOperation({ summary: 'Add cart-item' })
    @ApiResponse({ status: 201, type: CartItem })
    @ApiParam({ name: 'authorization', description: 'token' })
    @ApiParam({ name: 'productId', example: '/cart-item/1' })
    @UseGuards(new RoleGuard('customer'))
    @Post('/:productId')
    addCartItems(
        @Headers('authorization') authorization: string,
        @Param('productId') productId: number,
        @Body() count: CountObject) {
        return this.cartItemService.updateCartItems(authorization, productId, count.count)
    }

    @ApiOperation({ summary: 'Delete cart-item' })
    @ApiResponse({ status: 200, description: 'void' })
    @ApiParam({ name: 'productId', example: '/cart-item/1' })
    @ApiParam({ name: 'authorization', description: 'token' })
    @UseGuards(new RoleGuard('customer'))
    @Delete('/:productId')
    deleteCartItem(
        @Headers('authorization') authorization: string,
        @Param('productId') productId: number) {
        return this.cartItemService.deleteCartItem(authorization, productId)
    }

    @ApiOperation({ summary: 'Clear cart' })
    @ApiResponse({ status: 200, description: 'void' })
    @ApiParam({ name: 'authorization', description: 'token' })
    @UseGuards(new RoleGuard('customer'))
    @Delete()
    deleteCartItems(@Headers('authorization') authorization: string) {
        return this.cartItemService.clearCartItems(authorization)
    }
}