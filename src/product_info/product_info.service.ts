import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInfo } from './product_info.model';

@Injectable()
export class ProductInfoService {
    constructor(@InjectModel(ProductInfo) private productInfoTable: typeof ProductInfo) { }

    async createProductInfo(productId: number, attributeId: number, value: string) {
        console.log(productId, attributeId, value)
        const productInfo = await this.productInfoTable.create({ productId: productId, attributeId: attributeId, value: value })
        return productInfo
    }

    async getProductInfo(prodcutId: number) {
        const productInfoArray = await this.productInfoTable.findAll({ where: { productId: prodcutId } })
        return productInfoArray
    }

    async updateProductInfo(productId: number, attributeId: number, value: string) {
        await this.productInfoTable.update({ value: value }, { where: { productId: productId, attributeId: attributeId } })
    }

    async deleteteProductInfo(productId: number, attributeId: number) {
        await this.productInfoTable.destroy({ where: { productId: productId, attributeId: attributeId } })
    }

    async deleteAllProductInfo(productId: number) {
        await this.productInfoTable.destroy({ where: { productId: productId } })
    }

}
