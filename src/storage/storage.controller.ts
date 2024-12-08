import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { ApiResponse } from '../types/api';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse<any>> {
    try {
      const key = await this.storageService.uploadFile(file);
      return {
        message: 'File uploaded successfully',
        data: key,
        statusCode: 200,
      };
    } catch {
      return {
        message: 'Error uploading file',
        data: null,
        statusCode: 500,
      };
    }
  }

  @Get('files')
  async listFiles(): Promise<ApiResponse<any>> {
    try {
      const files = await this.storageService.getFiles();
      return {
        message: 'Files retrieved successfully',
        data: files.map((file) => file.Key),
        statusCode: 200,
      };
    } catch {
      return {
        message: 'Error listing file',
        data: null,
        statusCode: 500,
      };
    }
  }

  @Delete('files/:key')
  async deleteFile(@Param('key') key: string): Promise<ApiResponse<any>> {
    try {
      const deletedFileKey = await this.storageService.deleteFile(key);
      return {
        message: 'File deleted successfully',
        data: deletedFileKey,
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: 'Error deleting file',
        data: null,
        statusCode: 500,
      };
    }
  }
}
