import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/service/user.service';
import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/local';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getInfo(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updateInfo(@Request() req: any) {
    const user = <CreateUserDto>req.user;
    return await this.usersService.update(user.username, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async deleteUser(@Request() req: any) {
    const user = <CreateUserDto>req.user;
    return await this.usersService.remove(user.username);
  }
}
