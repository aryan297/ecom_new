import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/–flat/auth/user.entity/user.entity';
import { ProductEntity } from 'src/–flat/product/product.entity/product.entity';


@Injectable()
export class ProductsService {
   constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) { }
  
   async getAll(): Promise<ProductEntity[]> {
       return await this.productRepository.find()
   }

   async create(product: ProductEntity, user: Users): Promise<ProductEntity> {
       if (user.role == 'admin') {
           return await this.productRepository.save(product);

       }
       throw new UnauthorizedException();

   }

   async getOne(id: number): Promise<ProductEntity> {
       return this.productRepository.findOne({where:{id:id}});
   }

   async update(id: number, product: ProductEntity, user: Users): Promise<UpdateResult> {
       if (user.role == 'admin') {
           return await this.productRepository.update(id, product);
       }
       throw new UnauthorizedException();
   }

   async delete(id: number, user: Users): Promise<DeleteResult> {
       if (user.role == 'admin') {
           return await this.productRepository.delete(id);
       }
       throw new UnauthorizedException();
   }
  
}