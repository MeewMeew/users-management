import { Authorization } from 'types/auth.types';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { CreateUser, Credentials } from 'src/swagger/auth.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
@UseGuards(LocalAuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  public async login(@Body() credentials: Credentials): Promise<Authorization> {
    const user = await this.authService.login(credentials);
    return user;
  }

  @Post('/register')
  public async register(@Body() createUser: CreateUser): Promise<Authorization> {
    const user = await this.authService.register(createUser);
    return user;
  }
}
