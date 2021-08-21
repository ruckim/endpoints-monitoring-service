require("dotenv").config();
// here is the layer which takes care of what and how it should be used, under what conditions and with what params
//

// TODO IDEA - does this have a real world use case? testing? prototyping?
// I can try for example have some computing engine using some specific handler
// and this handler can be specified/defined in config,
// where can be replaced by any handler
// if used handler ok, then can be more properly implemented?
// pros: no need to deploy or even modify production code
// cons: any known problem with practical execution?

// can split configs to prevent coupling of service in app config
const appConfig = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT,
  DB_CON_STRING: process.env.DB_CON_STRING,
};

export const config = Object.freeze(appConfig);
