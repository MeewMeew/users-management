import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { UserController, UserModule } from './user';
import { AuthController, AuthModule, AuthService } from './auth';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [AuthController, UserController],
  providers: [AuthService],
})
export class AppModule { }
