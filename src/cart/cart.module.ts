import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { CartItem } from 'src/cart-item/cart-item.model';

@Module({
  controllers: [],
  providers: [CartService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Cart, CartItem]),
  ],
  exports: [CartService]
})
export class CartModule { }
