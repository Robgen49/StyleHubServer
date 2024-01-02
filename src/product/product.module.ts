import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from 'src/cart-item/cart-item.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Product } from './product.model';
import { RaitingModule } from 'src/raiting/raiting.module';
import { Raiting } from 'src/raiting/raiting.model';
import { TypeModule } from 'src/type/type.module';
import { ProductInfoModule } from 'src/product_info/product_info.module';
import { FileModule } from 'src/file/file.module';

@Module({

  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([Product, CartItem, Raiting]),
    RaitingModule,
    AuthModule,
    TypeModule,
    ProductInfoModule,
    FileModule,
    JwtModule
  ],
  exports: [ProductService]
})
export class ProductModule { }