import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

export function DocsDecorator() {
  return applyDecorators(
    ApiHeader({
      name: 'token',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiOperation({ summary: 'List files key of your cloud' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Files retrieved successfully',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: 'Files retrieved successfully',
          data: ['fileKey1', 'fileKey2'],
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Error listing files',
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error listing files',
          data: null,
        },
      },
    }),
  );
}
