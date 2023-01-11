import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/product/service/product/product.service';
import { Users } from 'src/–flat/auth/user.entity/user.entity';
import { CartEntity } from 'src/–flat/cart/cart.entity/cart.entity';
import { CartService } from 'src/–flat/cart/service/cart/cart.service';
import { OrderEntity } from 'src/–flat/order/order.entity/order.entity';
import { OrderService } from 'src/–flat/order/service/order/order.service';
import { ProductEntity } from 'src/–flat/product/product.entity/product.entity';


@Module({
 imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity, CartEntity, Users])],
 controllers: [],
 providers: [OrderService, CartService, ProductsService],
 exports:[OrderService,CartService, ProductsService]
})
export class OrderModule {}
