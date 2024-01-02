import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { RoleGuard } from 'src/auth/role.guard';
import { UpdateProductCountDto } from './dto/update-product-count.dto';
import { RaintigValue } from 'src/types';
import { Product } from './product.model';
import { Raiting } from 'src/raiting/raiting.model';
import { GetProductInfoDto } from './dto/get-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { DeleteProductInfoDto } from './dto/delete-product-info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product-by-id.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @ApiOperation({ summary: 'Create product' })
    @ApiResponse({ status: 201, type: Product })
    @Post()
    @UseGuards(new RoleGuard('creator'))
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto)
    }

    @ApiOperation({ summary: 'Update count of product' })
    @ApiResponse({ status: 200, description: 'void' })
    @Put('/count')
    @UseGuards(new RoleGuard('filler'))
    updateProductCount(@Body() updateProductDto: UpdateProductCountDto) {
        return this.productService.updateProductCount(updateProductDto)
    }

    @ApiOperation({ summary: 'Update product' })
    @ApiResponse({ status: 200, description: 'void' })
    @Put()
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(new RoleGuard('creator'))
    updateProduct(@Body() updateProductDto: UpdateProductDto) {
        return this.productService.updateProduct(updateProductDto)
    }

    @ApiOperation({ summary: 'Add product raiting' })
    @ApiResponse({ status: 200, type: Raiting })
    @ApiParam({ name: 'authorization', description: 'token' })
    @ApiParam({ name: 'prodcutId', example: 'product/rainting/1' })
    @Post('/raiting/:productId')
    @UseGuards(new RoleGuard('customer'))
    addProductRaiting(
        @Headers('authorization') authorization: string,
        @Param('productId') productId: number,
        @Body() raintingValue: RaintigValue) {
        return this.productService.addProductRaiting(authorization, productId, raintingValue)
    }

    @ApiOperation({ summary: 'Delete product raiting' })
    @ApiResponse({ status: 200, description: 'void' })
    @ApiParam({ name: 'authorization', description: 'token' })
    @ApiParam({ name: 'prodcutId', example: 'product/rainting/1' })
    @Delete('/raiting/:productId')
    @UseGuards(new RoleGuard('customer'))
    deleteProductRaiting(
        @Headers('authorization') authorization: string,
        @Param('productId') productId: number) {
        return this.productService.deleteProductRaiting(authorization, productId)
    }

    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, type: [Product] })
    @Get()
    getAllProducts() {
        return this.productService.getAllProducts()
    }

    @ApiOperation({ summary: 'Get product info by id' })
    @ApiResponse({ status: 200, type: Product })
    @ApiParam({ name: 'id', example: '/product/1' })
    @Get('/:id')
    getProductInfo(@Param('id') productId: number) {
        return this.productService.getProductById(productId)
    }
    // @ApiOperation({ summary: 'Get product info by title' })
    // @ApiResponse({ status: 200, type: Product })
    // @ApiParam({ name: 'title', example: '/product/hat' })
    // @Get('/:title')
    // getProductInfo(@Param('title') title: string) {
    //     return this.productService.getProductByTitle(title)
    // }

    @ApiOperation({ summary: 'Add product info' })
    @ApiResponse({ status: 200, type: GetProductInfoDto })
    @Post('/info')
    addProductInfo(@Body() updateProductInfoDto: UpdateProductInfoDto) {
        return this.productService.addProductInfo(updateProductInfoDto)
    }

    @ApiOperation({ summary: 'Update product info' })
    @ApiResponse({ status: 200, description: 'void' })
    @Put('/info')
    updateProductInfo(@Body() updateProductInfoDto: UpdateProductInfoDto) {
        return this.productService.updateProductInfoById(updateProductInfoDto)
    }

    @ApiOperation({ summary: 'Delete all product info' })
    @ApiResponse({ status: 200, description: 'void' })
    @Delete('/info/:id')
    deleteAllProductInfo(@Param('id') id: number) {
        return this.productService.deleteAllProductInfo(id)
    }

    @ApiOperation({ summary: 'Delete product info' })
    @ApiResponse({ status: 200, description: 'void' })
    @Delete('/info')
    deleteProductInfo(@Body() deleteProductInfo: DeleteProductInfoDto) {
        return this.productService.deleteProductInfo(deleteProductInfo)
    }
}
