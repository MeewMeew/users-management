import { Module } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserController],
  exports: [UserService],
})
export class UserModule {}
