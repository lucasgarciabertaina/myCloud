import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  constructor(init?: Partial<ResponseDto<T>>) {
    Object.assign(this, init);
  }
}
