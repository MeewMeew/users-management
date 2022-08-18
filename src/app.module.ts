import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/module/user.module';
import { UserController } from './user/controller/user.controller';
import { AuthService } from './auth/service/auth.service';
import { AuthModule } from './auth/module/auth.module';
import { AuthController } from './auth/controller/auth.controller';
import { AdminModule } from './admin/module/admin.module';
import { AdminController } from './admin/controller/admin.controller';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, AdminModule],
  controllers: [AuthController, UserController, AdminController],
  providers: [AuthService],
})
export class AppModule {}
