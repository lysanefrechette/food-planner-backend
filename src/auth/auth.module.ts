import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule, UsersModule, JwtModule],
  providers: [AuthService, JwtStrategy, JwtModule, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
