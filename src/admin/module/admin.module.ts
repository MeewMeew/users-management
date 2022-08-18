import { AdminController } from './../controller/admin.controller';
import { Module } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { UserModule } from 'src/user/module/user.module';

@Module({
  imports: [UserModule],
  providers: [AdminService, AdminController],
  exports: [AdminService],
})
export class AdminModule {}
