import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attribute } from './attribute.model';

@Module({
  providers: [AttributeService],
  imports: [
    SequelizeModule.forFeature([Attribute])
  ],
  exports: [AttributeService],
})
export class AttributeModule { }
 