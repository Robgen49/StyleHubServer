import { Module } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductInfo } from './product_info.model';

@Module({
  providers: [ProductInfoService],
  imports: [
    SequelizeModule.forFeature([ProductInfo])
  ],
  exports: [ProductInfoService]
})
export class ProductInfoModule { }
