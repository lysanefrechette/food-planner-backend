import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/decorator/role.decorator';
import { RolesEnum } from './auth/enum/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Roles(RolesEnum.User)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
