// TODO make env for dev, test, prod

const appConfig = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT,
  DB_CON_STRING: process.env.DB_CON_STRING,
};

export const config = Object.freeze(appConfig);
