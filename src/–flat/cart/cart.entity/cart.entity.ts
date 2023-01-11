import { Users } from 'src/–flat/auth/user.entity/user.entity'
import { ProductEntity } from 'src/–flat/product/product.entity/product.entity'
import { Entity, OneToOne,ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class CartEntity {
   @PrimaryGeneratedColumn('uuid')
   id: number

   @Column()
   total: number

   @Column()
   quantity: number
  
  @ManyToOne(type => ProductEntity, order => order.id)
   @JoinColumn()
   item: ProductEntity

   @ManyToOne(type => Users, user => user.username)
   @JoinColumn()
   user: Users 
}