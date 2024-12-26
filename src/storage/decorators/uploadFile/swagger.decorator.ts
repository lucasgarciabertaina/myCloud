import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';

export function DocsDecorator() {
  return applyDecorators(
    ApiHeader({
      name: 'token',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiOperation({ summary: 'Upload a file into your cloud' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'File upload',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'File uploaded successfully',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: 'File uploaded successfully',
          data: 'file key',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Error uploading file',
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error uploading file',
          data: null,
        },
      },
    }),
  );
}
