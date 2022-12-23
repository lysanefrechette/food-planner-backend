import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';
import {ModelClass} from "objection";
import {UserModel} from "../database/models/user.model";

@Injectable()
export class UsersService {

    private readonly logger: Logger;

    constructor(
        @Inject('UserModel') private modelClass: ModelClass<UserModel>
    )
    {}

    findOne(username: string) {
        const user = this.modelClass.query().findOne('username', '=', username);
        if(user == undefined){
            this.logger.error('User does not exist');
            return null;
        }
        else{
            return user;
        }
    }
}
