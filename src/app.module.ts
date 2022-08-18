import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/module/user.module';
import { UserController } from './user/controller/user.controller';
import { AuthService } from './auth/service/auth.service';
import { AuthModule } from './auth/module/auth.module';
import { AuthController } from './auth/controller/auth.controller';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [AuthController, UserController],
  providers: [AuthService],
})
export class AppModule { }
