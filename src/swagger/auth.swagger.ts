import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class Credentials {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
