import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderItem } from 'src/order-item/order-item.model';
import { AuthModule } from 'src/auth/auth.module';
import { OrderItemModule } from 'src/order-item/order-item.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    SequelizeModule.forFeature([Order, OrderItem]),
    AuthModule,
    OrderItemModule,
    CartItemModule, 
    ProductModule
  ],
  exports: [OrderService]
})
export class OrderModule { }
