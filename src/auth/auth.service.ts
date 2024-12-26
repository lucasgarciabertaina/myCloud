import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly email = process.env.EMAIL;
  private readonly password = process.env.HASHED_PASSWORD;

  constructor(private readonly jwtService: JwtService) {}

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<string> {
    const { email, password } = credentials;

    const isPasswordValid = await bcrypt.compare(password, this.password);
    if (this.email !== email || !isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { email, password };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
