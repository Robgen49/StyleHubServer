import { Module, forwardRef } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from 'src/cart/cart.model';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/product/product.model';
import { CartItem } from './cart-item.model';
import { UsersModule } from 'src/users/users.module';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [CartItemService],
  controllers: [CartItemController],
  imports: [
    SequelizeModule.forFeature([Product, Cart, CartItem]),
    AuthModule,
    CartModule,
    ProductModule
  ],
  exports: [CartItemService]
})
export class CartItemModule { }