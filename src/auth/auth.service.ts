import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { UserModel } from '../database/models/user.model';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserModel> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      if (await argon2.verify(user.password, password)) {
        return user;
      }
    }
    return null;
  }

  async login(user: UserModel): Promise<{ refresh: string; access: string }> {
    const access = await this.generateAccess(user);
    const refresh = await this.generateRefresh(user);
    return {
      refresh,
      access,
    };
  }

  async generateRefresh(user: UserModel): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_KEY,
      expiresIn: process.env.REFRESH_EXPIRY,
    });
  }

  async generateAccess(user: UserModel): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.roleId,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_KEY,
      expiresIn: process.env.ACCESS_EXPIRY,
    });
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_KEY,
      });
      const userFromDB = await this.usersService.findByUsername(user.username);
      if (!user || !userFromDB) {
        return null;
      }
      return { access: await this.generateAccess(userFromDB) };
    } catch (err) {
      return null;
    }
  }
}
