import { applyDecorators } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { DocsDecorator } from '../downloadFile/swagger.decorator';

export function DownloadFileDecorator() {
  return applyDecorators(Get(':key'), DocsDecorator());
}
