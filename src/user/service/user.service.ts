import { UniquePayload } from 'types/user.types';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { User } from '../entity';
import { config } from 'src/config/app.config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async isUnique(payload: Partial<UniquePayload>): Promise<boolean> {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const value = payload[key];
        const user = await this.userRepository.findOne({
          where: {
            [key]: value,
          },
        });
        if (user) return false;
      }
    }
    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    const unique = await this.isUnique({
      username: user.username,
      email: user.email,
    });
    if (!unique)
      throw new HttpException('Email or username already exists.', 409);
    const hash = await this.hashPassword(createUserDto.password);
    user.password = hash;
    const save = await this.userRepository.save(user);
    return save;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async remove(username: string): Promise<boolean> {
    await this.userRepository.delete({ username: username });
    return true
  }

  async update(username: string, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    for (const key in createUserDto) {
      if (createUserDto.hasOwnProperty(key)) {
        switch (key) {
          case 'password':
            const hash = await this.hashPassword(createUserDto.password);
            user[key] = hash;
            break;
          case 'username':
          case 'email':
            const unique = await this.isUnique({ [key]: createUserDto[key] });
            if (!unique)
              throw new HttpException('Email or username already exists.', 409);
            user[key] = createUserDto[key];
            break;
          default:
            user[key] = createUserDto[key];
            break;
        }
      }
    }
    return await this.userRepository.save<User>(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, config.saltRounds);
    return hash;
  }
}
