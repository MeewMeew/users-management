import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserModule } from 'src/user/module/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../local';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'src/config/app.config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
