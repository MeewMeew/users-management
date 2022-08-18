import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getInfo(@Request() req: any): Promise<User> {
    return <User>req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updateInfo(@Request() req: any): Promise<User> {
    const user = <CreateUserDto>req.user;
    return await this.usersService.update(user.username, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async deleteUser(@Request() req: any): Promise<boolean> {
    const user = <CreateUserDto>req.user;
    return await this.usersService.remove(user.username);
  }
}
