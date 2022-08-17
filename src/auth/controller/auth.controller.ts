import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../local';
import { AuthService } from '../service/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    const user = await this.authService.login(req.body);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/register')
  async register(@Request() req: any) {
    const user = await this.authService.register(req.body);
    return user;
  }
}
