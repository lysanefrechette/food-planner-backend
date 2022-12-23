import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {Roles} from "./auth/role.decorator";
import {RolesEnum} from "./auth/enum/roles.enum";
import {Public} from "./auth/public.decorator";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private authService: AuthService
  ) {}

  @Roles(RolesEnum.User)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request){
    return this.authService.login(request.user);
  }
}
