import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductCountDto } from './dto/update-product-count.dto';
import { Op, where } from 'sequelize';
import { UpdateProductSaledDto } from './dto/update-product-saled.dto';
import { RaintigCreationAttributes, Raiting } from 'src/raiting/raiting.model';
import { RaitingService } from 'src/raiting/raiting.service';
import { UpdateRaitingDto } from 'src/raiting/dto/update-raiting.dto';
import { DeleteRaitingDto } from 'src/raiting/dto/delete-raiting.dto';
import { RaintigValue } from 'src/types';
import { AuthService } from 'src/auth/auth.service';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { ProductInfo } from 'src/product_info/product_info.model';
import { ProductInfoService } from 'src/product_info/product_info.service';
import { GetProductInfoDto } from './dto/get-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { DeleteProductInfoDto } from './dto/delete-product-info.dto';
import { FileService } from 'src/file/file.service';
import { UpdateProductDto } from './dto/update-product-by-id.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product) private productTable: typeof Product,
        private raitingService: RaitingService,
        private authService: AuthService,
        private productInfoService: ProductInfoService,
        private fileService: FileService
    ) { }

    async createProduct(createProductDto: CreateProductDto) {
        const product = await this.productTable.create({
            title: createProductDto.title,
            currentCount: createProductDto.count,
            image: createProductDto.image,
            price: createProductDto.price,
            typeId: createProductDto.typeId
        })
        return product
    }

    async updateProduct(updateProductDto: UpdateProductDto) {
        const product = await this.productTable.update({
            title: updateProductDto.title,
            currentCount: updateProductDto.count,
            image: updateProductDto.image,
            price: updateProductDto.price,
            typeId: updateProductDto.typeId
        }, { where: { title: updateProductDto.title } })
        return product
    }

    async updateProductInfoById(updateProductInfoDto: UpdateProductInfoDto) {
        updateProductInfoDto.productInfo.forEach(async (productInfo: CreateProductInfoDto) =>
            await this.productInfoService.updateProductInfo(
                updateProductInfoDto.productId,
                productInfo.attributeId,
                productInfo.value
            )
        )
    }

    async getAllProducts() {
        const products = await this.productTable.findAll();
        return products
    }

    async getProductByTitle(title: string) {
        const product = await this.productTable.findOne({ where: { title: title } })
        const productInfo = await this.productInfoService.getProductInfo(product.id)
        return { product: product, productInfoArray: productInfo }
    }

    async getProductById(id: number) {
        const product = await this.productTable.findOne({ where: { id: id } })
        const productInfo = await this.productInfoService.getProductInfo(id)
        return { product: product, productInfoArray: productInfo }
    }

    async getUnoccupiedProducts() {
        const unoccupiedProducts = await this.productTable.findAll({ where: { currentCount: { [Op.gt]: 0 } } })
        return unoccupiedProducts
    }

    async updateProductCount(updateProductCountDto: UpdateProductCountDto) {
        const updatedProduct = await this.productTable.update({ currentCount: updateProductCountDto.count }, { where: { id: updateProductCountDto.id } })
        return updatedProduct
    }

    async updateProductSaled(updateProductSaledDto: UpdateProductSaledDto) {
        const updatedProduct = await this.productTable.update({ saledCount: updateProductSaledDto.saled }, { where: { id: updateProductSaledDto.id } })
        return updatedProduct
    }

    private async setAwerageRaiting(id: number) {
        const raitings = (await this.raitingService.getProductRaintings(id)).map((raiting: Raiting) => raiting.value)
        const sum = raitings.reduce((prev, next) => prev + next)
        const awerageRaiting = Number((sum / raitings.length).toFixed(1))
        const updatedProduct = await this.productTable.update({ AwerageRaiting: awerageRaiting }, { where: { id: id } })
        return updatedProduct
    }

    async addProductRaiting(authorization: string, productId: number, raintingValue: RaintigValue) {

        const createRaiting: RaintigCreationAttributes = {
            productId: productId,
            value: raintingValue.value,
            userId: this.authService.getUserId(authorization)
        }

        try {
            const raiting = await this.raitingService.createRaiting(createRaiting)
            await this.setAwerageRaiting(raiting.productId)
        }
        catch (e) {
            this.updateProductRaiting(createRaiting)
        }
    }

    async addProductInfo(updateProductInfoDto: UpdateProductInfoDto) {
        updateProductInfoDto.productInfo.forEach(async (productInfo: CreateProductInfoDto) =>
            await this.productInfoService.createProductInfo(
                updateProductInfoDto.productId,
                productInfo.attributeId,
                productInfo.value
            )
        )
        const productInfo = await this.getProductById(updateProductInfoDto.productId)
        return productInfo
    }

    async deleteAllProductInfo(id: number) {
        await this.productInfoService.deleteAllProductInfo(id)
    }

    async deleteProductInfo(deleteProductInfo: DeleteProductInfoDto) {
        await this.productInfoService.deleteteProductInfo(deleteProductInfo.productId, deleteProductInfo.attributeId)
    }

    async updateProductRaiting(updateRating: UpdateRaitingDto) {
        await this.raitingService.updateRaing(updateRating)
        await this.setAwerageRaiting(updateRating.productId)
    }

    async deleteProductRaiting(authorization: string, productId: number) {

        const deleteRaiting: DeleteRaitingDto = {
            productId: productId,
            userId: this.authService.getUserId(authorization)
        }

        await this.raitingService.deleteRaiting(deleteRaiting)
        await this.setAwerageRaiting(deleteRaiting.productId)
    }

}