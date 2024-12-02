import { AppService } from './../app.service';
import { Body, Get, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials);
  }

  @Get('test')
  async getTest(): Promise<string> {
    return this.appService.getTest();
  }
}
