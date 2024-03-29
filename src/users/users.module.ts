import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { Cart } from 'src/cart/cart.model';
import { Raiting } from 'src/raiting/raiting.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Cart, Raiting]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
