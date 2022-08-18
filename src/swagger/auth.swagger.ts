import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class CreateUser {
  @ApiHideProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiHideProperty()
  role: string;
}

export class Credentials {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
