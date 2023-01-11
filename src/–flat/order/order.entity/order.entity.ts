import { Users } from 'src/–flat/auth/user.entity/user.entity';
import { ProductEntity } from 'src/–flat/product/product.entity/product.entity';
import { Entity, OneToMany, JoinColumn, OneToOne, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class OrderEntity {
   @PrimaryGeneratedColumn('uuid')
   id: number

   @OneToMany(type => ProductEntity, item => item.id)
   items: ProductEntity[];

   @OneToOne(type => Users, user => user.username)
   @JoinColumn()
   user : Users;

   @Column()
   subTotal: number

   @Column({ default: false })
   pending: boolean

}