import { Module } from '@nestjs/common';
import { UserService } from '../service';
import { UserController } from '../controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserController],
  exports: [UserService],
})
export class UserModule {}
