
import { Users, UserType } from '../user.entity/user.entity';
export class CreateUserDto {

  username: string;

  password: string;
  
  email: string;

  address: string;

  role:UserType;

  static createUserDto(newUser: CreateUserDto): CreateUserDto {
    const entity = new Users();
    entity.username = newUser.username;
    entity.email = newUser.email;
    entity.address = newUser.address;
    entity.password = newUser.password;
    entity.role = !newUser.role? UserType.consumer: null;
    return entity;
  }
}
