import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from "./database/database.module";
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./auth/roles.guard";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Module({
  imports: [DatabaseModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
  }), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule {}
