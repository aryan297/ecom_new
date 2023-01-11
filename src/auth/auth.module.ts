import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/–flat/auth/user.entity/user.entity';
import { jwtConstants } from './constants';


@Module({
    imports:[
        PassportModule,
   JwtModule.register({
     secret: jwtConstants.secret,
     signOptions: { expiresIn: '60m' },
   }),
   TypeOrmModule.forFeature([Users])],
   

  providers: [AuthService,
    LocalStrategy,
    JwtStrategy],
    exports: [
        AuthService,
        PassportModule,
    ],
})
export class AuthModule {}
