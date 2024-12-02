import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Importamos el módulo de JWT de NestJS
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from 'src/config/jwt.config';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => jwtConfig(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AppService],
  controllers: [AuthController],
})
export class AuthModule {}
