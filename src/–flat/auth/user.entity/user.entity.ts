
import { CartEntity } from 'src/–flat/cart/cart.entity/cart.entity'
import { OrderEntity } from 'src/–flat/order/order.entity/order.entity'
import { Entity, OneToOne, JoinColumn,Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'



export enum UserType{
   consumer='consumer',
   admin='admin'

}
@Entity()
export class Users {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   username: string

   @Column()
   email: string


   @Column()
   password: string

   @Column({nullable: true})
   role: UserType

   @Column()
   address: string

   @CreateDateColumn()
   createdAt : String

   @UpdateDateColumn()
   updtedAt : String

   @OneToMany(type => CartEntity, cart => cart.id)
   @JoinColumn()
   cart: CartEntity[]

   @OneToOne(type => OrderEntity, order => order.id)
   @JoinColumn()
   order : OrderEntity;

}
