import { applyDecorators } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { DocsDecorator } from './swagger.decorator';

export function ListFilesDecorator() {
  return applyDecorators(Get('files'), DocsDecorator());
}
