import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/entity/user.entity';
import { config } from 'src/config/app.config';
import { Credentials, Authorization } from 'types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) return user;
    return null;
  }

  public async sign(user: User): Promise<Authorization> {
    const payload = { username: user.username, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: config.jwtSecret,
      expiresIn: config.jwtExpiration,
    });
    return { access_token: access_token };
  }

  public async login(credentials: Credentials): Promise<Authorization> {
    const user = await this.validateUser(
      credentials.username,
      credentials.password,
    );
    if (!user) throw new UnauthorizedException();
    return await this.sign(user);
  }

  public async register(user: User): Promise<Authorization> {
    const existingUser = await this.validateUser(user.username, user.password);
    if (existingUser)
      throw new HttpException('Email or username already exists.', 409);
    await this.usersService.create(user);
    return await this.sign(user);
  }
}
