"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const objection_1 = require("objection");
module.exports = Object.assign({ client: 'mysql2', connection: process.env.DATABASE_URL, migrations: {
        directory: './src/database/migrations',
        stub: './src/database/migration.stub',
    }, seeds: {
        directory: './src/database/seeds',
        stub: './src/database/seed.stub'
    } }, (0, objection_1.knexSnakeCaseMappers)());
//# sourceMappingURL=knexfile.js.map