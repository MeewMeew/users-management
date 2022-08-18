import { Authorization } from 'types/auth.types';
import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../local/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { Request } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request): Promise<Authorization> {
    const user = await this.authService.login(req.body);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/register')
  async register(@Req() req: Request): Promise<Authorization> {
    const user = await this.authService.register(req.body);
    return user;
  }
}
