import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

export function DocsDecorator() {
  return applyDecorators(
    ApiHeader({
      name: 'token',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiOperation({ summary: 'Delete a file from your cloud' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'File deleted successfully',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: 'File deleted successfully',
          data: 'deleted file key',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Error deleting file',
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error deleting file',
          data: null,
        },
      },
    }),
  );
}
