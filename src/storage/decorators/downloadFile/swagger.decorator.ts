import { applyDecorators, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function DocsDecorator() {
  return applyDecorators(
    ApiTags('Storage'),
    ApiOperation({ summary: 'Download a file from the storage' }),
    ApiResponse({
      status: 200,
      description: 'File downloaded successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'File not found',
    }),
  );
}
