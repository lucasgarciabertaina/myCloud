import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  _Object,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}`;
    this.s3Client = new S3Client({
      endpoint,
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.get('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true,
    });
    this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      return fileKey;
    } catch (error) {
      console.error(error);
      throw new Error('Error uploading file. Please try again later');
    }
  }

  async getFiles(): Promise<Array<_Object>> {
    try {
      const data: ListObjectsV2CommandOutput = await this.s3Client.send(
        new ListObjectsV2Command({
          Bucket: this.bucketName,
        }),
      );
      return data.Contents || [];
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching files. Please try again later');
    }
  }

  async deleteFile(Key: string): Promise<string> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key,
        }),
      );

      return Key;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching files. Please try again later');
    }
  }

  async getFileStream(Key: string): Promise<Readable> {
    try {
      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucketName,
          Key,
        }),
      );

      if (!response.Body) {
        throw new Error('File not found');
      }

      return response.Body as Readable;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching file stream. Please try again later');
    }
  }
}
