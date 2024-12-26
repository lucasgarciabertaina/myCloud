import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  message: string;
  data: T;
  statusCode: HttpStatus;
}
