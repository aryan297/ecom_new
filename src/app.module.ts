import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './–flat/cart/service/cart/cart.service';
import { OrderService } from './–flat/order/service/order/order.service';
import { AuthGuard } from '@nestjs/passport';
import { Users } from './–flat/auth/user.entity/user.entity';
import { ProductEntity } from './–flat/product/product.entity/product.entity';
import { CartEntity } from './–flat/cart/cart.entity/cart.entity';
import { OrderEntity } from './–flat/order/order.entity/order.entity';
import { AuthController } from './–flat/auth/controller/auth/auth.controller';
import { ProductsController } from './–flat/product/controller/product/product.controller';
import { CartController } from './–flat/cart/controller/cart/cart.controller';
import { OrderController } from './–flat/order/controller/order/order.controller';

@Module({
  imports: [ 
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecom',
      entities: [Users, ProductEntity,CartEntity,OrderEntity],
      synchronize: true,
    }),ProductModule, CartModule, OrderModule],
  controllers: [AppController, AuthController, ProductsController, CartController, OrderController],
  providers: [AppService],
})
export class AppModule {}
