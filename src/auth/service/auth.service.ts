import { CreateUserDto } from 'src/user/dto/create-user.dto';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/app.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) return user;
    return null;
  }

  async sign(user: CreateUserDto) {
    const payload = { username: user.username, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: config.jwtSecret,
      expiresIn: '1d',
    });
    return { access_token: access_token };
  }

  async login(user: Partial<User>) {
    const existingUser = await this.validateUser(user.username, user.password);
    if (!existingUser) throw new UnauthorizedException();
    return await this.sign(existingUser);
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.validateUser(user.username, user.password);
    if (existingUser)
      throw new HttpException('Email or username already exists.', 409);
    await this.usersService.create(user);
    return await this.sign(user);
  }
}
