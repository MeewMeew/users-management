import { ApiProperty } from '@nestjs/swagger';

export class UpdateUser {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ required: false })
  password?: string;
}
