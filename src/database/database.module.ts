import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'users-db.sqlite',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
