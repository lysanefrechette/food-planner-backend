import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from './decorator/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() request,
  ): Promise<{ refresh: string; access: string }> {
    return this.authService.login(request.user);
  }

  @Public()
  @Post('refresh')
  async refresh(@Request() request): Promise<{ access: string }> {
    const refreshToken = request.body['refresh'];
    const response = await this.authService.refreshToken(refreshToken);
    if (response) {
      return response;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
