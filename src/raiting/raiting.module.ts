import { Module } from '@nestjs/common';
import { RaitingService } from './raiting.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Raiting } from './raiting.model';
import { Product } from 'src/product/product.model';
import { User } from 'src/users/users.model';

@Module({
  providers: [RaitingService],
  imports: [
    SequelizeModule.forFeature([Raiting, Product, User])
  ],
  exports: [RaitingService]
})
export class RaitingModule { }