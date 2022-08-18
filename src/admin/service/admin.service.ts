import { UserService } from 'src/user/service/user.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { FindAllOptions } from 'types/user.types';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UserService) {}

  public async findByUsername(
    username: string,
    options?: Partial<FindAllOptions>,
  ): Promise<User[]> {
    const findOptions: Partial<FindAllOptions> = {
      ...options,
      key: 'username',
      search: username,
    };
    const { data } = await this.userService.findAll(findOptions);
    return data;
  }

  public async findByEmail(
    email: string,
    options?: Partial<FindAllOptions>,
  ): Promise<User[]> {
    const findOptions: Partial<FindAllOptions> = {
      ...options,
      key: 'email',
      search: email,
    };
    const { data } = await this.userService.findAll(findOptions);
    return data;
  }

  public async findByName(
    name: string,
    options?: Partial<FindAllOptions>,
  ): Promise<User[]> {
    const findOptions: Partial<FindAllOptions> = {
      ...options,
      key: 'name',
      search: name,
    };
    const { data } = await this.userService.findAll(findOptions);
    return data;
  }

  public async findByRole(
    role: string,
    options?: Partial<FindAllOptions>,
  ): Promise<User[]> {
    const findOptions: Partial<FindAllOptions> = {
      ...options,
      key: 'role',
      search: role,
    };
    const { data } = await this.userService.findAll(findOptions);
    return data;
  }
}
