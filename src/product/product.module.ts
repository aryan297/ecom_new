import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/–flat/product/product.entity/product.entity';
import { ProductsService } from './service/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsService]
})
export class ProductModule {}
