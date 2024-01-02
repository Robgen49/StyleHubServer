import { Injectable } from '@nestjs/common';
import { AttributeService } from 'src/attribute/attribute.service';
import { ProductService } from 'src/product/product.service';
import { TypeService } from 'src/type/type.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReportService {
    constructor(
        private usersService: UsersService,
        private typeService: TypeService,
        private productService: ProductService,
        private attributeService: AttributeService,
    ){}
    
    async getReport(){
        const title = 'Отчет за последние 30 дней. ' + (new Date()).toISOString()
        const usersCount = 'Всего пользователей: ' + (await this.usersService.getAllUsers()).length
        const productsCount = 'Всего товаров: ' + (await this.productService.getAllProducts()).length
        const unoccupiedProducts = 'Всего имеющихся в наличии товаров: ' + (await this.productService.getUnoccupiedProducts()).length
        // const typesCount = 'Всего типов: ' + await this.attributeService.getAttibutes()

    }
}
