import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Type } from './type.model';
import { Attribute } from 'src/attribute/attribute.model';
import { AttributeModule } from 'src/attribute/attribute.module';

@Module({
  providers: [TypeService],
  controllers: [TypeController],
  imports: [
    SequelizeModule.forFeature([Type, Attribute]),
    AttributeModule
  ],
  exports: [TypeService]
})
export class TypeModule { }
