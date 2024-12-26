import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { ApiResponse as ResponseInterface } from 'src/interfaces/response.interface';
import { LoginDto } from 'src/dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'User credentials for login',
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        statusCode: 200,
        message: 'Login successful',
        data: 'jwt-token-example',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid email or password',
        data: null,
      },
    },
  })
  async login(
    @Body() credentials: LoginDto,
  ): Promise<ResponseInterface<string>> {
    try {
      const token = await this.authService.login(credentials);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: token,
      };
    } catch (error) {
      throw {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid email or password',
        data: null,
      };
    }
  }
}
