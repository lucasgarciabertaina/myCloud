import { Controller, HttpStatus, Param, UploadedFile } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ResponseDto } from 'src/dto/response.dto';
import { ApiResponse as ResponseInterface } from 'src/interfaces/response.interface';
import { UploadFileDecorator } from './decorators/uploadFile/controller.decorator';
import { ListFilesDecorator } from './decorators/listFiles/controller.decorator';
import { DeleteFileDecorator } from './decorators/deleteFile/controller.decorator';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @UploadFileDecorator()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseInterface<string>> {
    try {
      const key = await this.storageService.uploadFile(file);
      return new ResponseDto<string>({
        message: 'File uploaded successfully',
        data: key,
        statusCode: HttpStatus.OK,
      });
    } catch {
      return new ResponseDto<null>({
        message: 'Error uploading file',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @ListFilesDecorator()
  async listFiles(): Promise<ResponseInterface<Array<string>>> {
    try {
      const files = await this.storageService.getFiles();
      return new ResponseDto<Array<string>>({
        message: 'Files retrieved successfully',
        data: files.map((file) => file.Key),
        statusCode: HttpStatus.OK,
      });
    } catch {
      return new ResponseDto<null>({
        message: 'Error listing files',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @DeleteFileDecorator()
  async deleteFile(@Param('key') key: string): Promise<ResponseInterface<any>> {
    try {
      const deletedFileKey: string = await this.storageService.deleteFile(key);
      return new ResponseDto<string>({
        message: 'File deleted successfully',
        data: deletedFileKey,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      return new ResponseDto<null>({
        message: 'Error deleting file',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
