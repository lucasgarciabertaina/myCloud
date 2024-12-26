import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post } from '@nestjs/common';
import { DocsDecorator } from './swagger.decorator';

export function UploadFileDecorator() {
  return applyDecorators(
    Post('upload'),
    UseInterceptors(FileInterceptor('file')),
    DocsDecorator(),
  );
}
