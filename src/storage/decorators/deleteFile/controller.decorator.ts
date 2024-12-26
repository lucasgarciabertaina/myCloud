import { applyDecorators } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { DocsDecorator } from './swagger.decorator';

export function DeleteFileDecorator() {
  return applyDecorators(Delete('files/:key'), DocsDecorator());
}
