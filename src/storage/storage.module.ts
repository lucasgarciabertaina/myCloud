import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule],
  providers: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
