import {Knex} from 'knex';
import {RoleModel} from "../models/role.model";

export async function seed(knex: Knex): Promise<any> {
    await RoleModel.query(knex).insert(
        {
            name: 'user'
        }
    );
    await RoleModel.query(knex).insert({
            name: 'admin'
        }
    );
}