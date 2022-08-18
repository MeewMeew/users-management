import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UpdateUser } from 'src/swagger/user.swagger';
import { Request } from 'express';
import { Roles } from 'src/role/decorator/role.decorator';
import { Role } from 'types/role.enum';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Roles(Role.USER)
@Controller('api/user')
@ApiBearerAuth('Authorization')
@ApiOkResponse({ description: 'Success' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/profile')
  async getInfo(@Req() req: Request): Promise<User> {
    return <User>req.user;
  }

  @Post('/update')
  async updateInfo(
    @Body() updateUser: UpdateUser,
    @Req() req: Request,
  ): Promise<User> {
    const user = <User>req.user;
    return await this.usersService.update(user.username, <User>updateUser);
  }

  @Post('/delete')
  async deleteUser(@Req() req: Request): Promise<boolean> {
    const user = <User>req.user;
    return await this.usersService.remove(user.username);
  }
}
