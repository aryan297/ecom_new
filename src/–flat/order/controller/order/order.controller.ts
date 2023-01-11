import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { OrderEntity } from '../../order.entity/order.entity';
import { OrderService } from '../../service/order/order.service';

@Controller('api/v1/order')
export class OrderController {
   constructor(private orderService: OrderService) { }


 //  @UseGuards(JwtAuthGuard)
   @Post()
   async order(@Request() req): Promise<any> {
       return this.orderService.order(req.user.username)
   }

 //  @UseGuards(JwtAuthGuard)
   @Get()
   async getOrders(@Request() req): Promise<OrderEntity[]> {
       return await this.orderService.getOrders(req.user.username)
   }
}