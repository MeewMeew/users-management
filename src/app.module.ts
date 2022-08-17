import { Module } from '@nestjs/common';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { DatabaseModule } from './database/database.module';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/module/user.module';
import { AuthModule } from './auth/module/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [AuthController, UserController],
  providers: [AuthService],
})
export class AppModule {}
