import knex from "knex";
import _ from "lodash";
import dbConfig from "../../knexfile";
import { config } from "../config";
import { knexSnakeCaseMappers } from "objection";
const environment = config.ENV || "development";
const environmentDbConfig = _.get(dbConfig, environment);
// TODO make case mapper work for migrations and seeds as well
Object.assign(environmentDbConfig, knexSnakeCaseMappers());

export const connection = knex(environmentDbConfig);
