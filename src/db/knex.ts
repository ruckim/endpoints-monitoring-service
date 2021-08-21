import knex from "knex";
import _ from "lodash";
import dbConfig from "./knexfile";
import { config } from "../config/config";
const environment = config.ENV || "development";
const environmentDbConfig = _.get(dbConfig, environment);
console.log("environmentDbConfig", environmentDbConfig);

export const connection = knex(environmentDbConfig);
