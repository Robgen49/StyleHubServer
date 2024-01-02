import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { Cart } from "./cart/cart.model";
import { ProductModule } from './product/product.module';
import { Product } from "./product/product.model";
import { CartItem } from "./cart-item/cart-item.model";
import { CartItemModule } from "./cart-item/cart-item.module";
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { Order } from "./order/order.model";
import { OrderItem } from "./order-item/order-item.model";
import { RaitingModule } from './raiting/raiting.module';
import { ProductInfoModule } from './product_info/product_info.module';
import { AttributeModule } from './attribute/attribute.module';
import { TypeModule } from './type/type.module';
import { Raiting } from "./raiting/raiting.model";
import { ProductInfo } from "./product_info/product_info.model";
import { Attribute } from "./attribute/attribute.model";
import { Type } from "./type/type.model";
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from 'path'
import { ReportModule } from './report/report.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Cart, CartItem, Product, Order, OrderItem, Raiting, ProductInfo, Attribute, Type],
            autoLoadModels: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static')
        })
        ,
        UsersModule, AuthModule, CartModule, CartItemModule, ProductModule, OrderModule, OrderItemModule, RaitingModule, ProductInfoModule, AttributeModule, TypeModule, FileModule, ReportModule
    ]
})

export class AppModule {

}