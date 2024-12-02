import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: '1h' },
});
