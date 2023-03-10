import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { Users } from 'src/–flat/auth/user.entity/user.entity';
import { CartService } from 'src/–flat/cart/service/cart/cart.service';
import { OrderEntity } from '../../order.entity/order.entity';

@Injectable()
export class OrderService {
   constructor(@InjectRepository(OrderEntity)
   private orderRepository: Repository<OrderEntity>,
       @InjectRepository(Users)
       private userRepository: Repository<Users>,
       private cartService: CartService) { }

       async order(user: string): Promise<any> {
        //find user existing orders
        const usersOrder = await this.orderRepository.find({ relations: ['user'] });
        const userOrder = usersOrder.filter(order => order.user?.username === user && order.pending === false);
        //find user's cart items
        const cartItems = await this.cartService.getItemsInCard(user)
        const subTotal = cartItems.map(item => item.total).reduce((acc, next) => acc + next);
        //get the authenticated user
        const authUser = await this.userRepository.findOne({where:{ username: user }})
        //if users has an pending order - add item to the list of order
        const cart = await cartItems.map(item => item.item);
 
        if (userOrder.length === 0) {
            const newOrder = await this.orderRepository.create({ subTotal });
            newOrder.items = cart
            newOrder.user = authUser;
            return await this.orderRepository.save(newOrder);
 
 
        } else {
            const existingOrder = userOrder.map(item => item)
            await this.orderRepository.update(existingOrder[0].id, { subTotal: existingOrder[0].subTotal + cart[0].price });
            return { message: "order modified" }
        }
    }

async getOrders(user: string): Promise<OrderEntity[]> {
       const orders = await this.orderRepository.find({ relations: ['user'] });
       return orders.filter(order => order.user?.username === user)
   }

}