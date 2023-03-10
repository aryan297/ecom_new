import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/service/auth.service';
import { Users } from '../../user.entity/user.entity';


@Controller('api/v1/auth/')
export class AuthController {
   constructor(private usersService: AuthService) { }
  
   @Post('signup')
   async signup(@Body() user: Users): Promise<Users> {
       return this.usersService.signup(user);
   }

   //@UseGuards(AuthGuard('local'))
   @Post('loginJWT')
   async login(@Request() req) {
       return this.usersService.login(req.user)
   }
   @Post('login')
   async loginPassword(@Body() user) {
    
       return this.usersService.validateUser(user.username, user.password)
   }
}