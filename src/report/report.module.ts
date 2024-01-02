import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';
import { AttributeModule } from 'src/attribute/attribute.module';
import { TypeModule } from 'src/type/type.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [ProductModule, UsersModule, AttributeModule, TypeModule],
  exports: [ReportService]
})
export class ReportModule { }
