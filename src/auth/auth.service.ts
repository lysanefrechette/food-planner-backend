import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as argon2 from "argon2";
import {UserModel} from "../database/models/user.model";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string){
        let user;
        user = await this.usersService.findOne(username);
        if(user){
            if (await argon2.verify(user.password, password)) {
                return user;
            }
        }
        return null;
    }

    async login(user: UserModel){
        const payload = {
            username: user.username,
            sub: user.id,
            role: user.roleId
        }

        return {
            accessToken : this.jwtService.sign(payload)
        }
    }

}
