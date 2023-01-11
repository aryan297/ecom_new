import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      // super();
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
      });
   }

   /* async validate(username: string, password: string): Promise<any> {
  
       const foundUser = await this.authService.validateUser(username, password);
       if (!foundUser) {
           throw new UnauthorizedException();
       }
       return foundUser;
   } */
   async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}