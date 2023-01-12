import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/–flat/auth/user.entity/user.entity';
import { CreateUserDto } from 'src/–flat/auth/request/create-user.request';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private userRepository: Repository<Users>, private jwt: JwtService) { }

    async signup(user: CreateUserDto): Promise<Users> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash
        return await this.userRepository.save(user);
    }
    async validateUser(username: string, password: string): Promise<any> {
        const foundUser = await this.userRepository.findOne({where: {username: username}});
        if (foundUser) {
            if (await bcrypt.compare(password, foundUser.password)) {
                const { password, ...result } = foundUser
                return result;
            }
 
            return null;
        }
        return null
 
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.id, role:user.role };
 
        return {
            access_token: this.jwt.sign(payload),
        };
    }

   }