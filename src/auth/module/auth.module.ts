import { Module } from '@nestjs/common';
import { AuthService } from '../service';
import { UserModule } from 'src/user';
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
      signOptions: { expiresIn: config.jwtExpiration },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
