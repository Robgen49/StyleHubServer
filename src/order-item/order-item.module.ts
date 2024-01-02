import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './order-item.model';
import { Order } from 'src/order/order.model';
import { AuthModule } from 'src/auth/auth.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [OrderItemService],
  controllers: [],
  imports: [
    SequelizeModule.forFeature([OrderItem, Order]),
    AuthModule,
    CartItemModule,
    ProductModule
  ],
  exports: [
    OrderItemService
  ]
})
export class OrderItemModule { }
