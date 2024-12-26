import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  password: string;
}
