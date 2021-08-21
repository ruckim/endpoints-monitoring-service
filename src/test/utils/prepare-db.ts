import { before, after } from "mocha";
import { connection as knex } from "../../db/knex";

async function fillDbWithData() {
  try {
    await knex.migrate.latest();
    await knex.seed.run();
  } catch (e) {
    console.error({ message: "error when preparing db data", error: e });
  }
}

// TODO  coupling app testing and implementation of db preparation
export async function prepareDb(hookFn: any) {
  // before drop, migrate and seed db
  hookFn(async () => {
    // how should I handle errors here in commands below???

    // how should I think about error handling below?
    // simple try catch for now
    try {
      // TODO consider moving to locked config file/object instead of using directly -> layer ensuring:
      // TODO - encapsulate config setup and provide only what is needed and in the specified way
      // TODO - managing different environments
      // TODO - make app configurable by env vars
      // TODO -
      if (process.env.NODE_ENV === "production") {
        console.warn(
          "STOP You tried to operate on production DB. This action could lead to unwanted losing of data... "
        );
        return;
      }

      await fillDbWithData();
    } catch (error) {
      console.error({
        message: "Error occurred when preparing DB for tests",
        error,
      });
    }
  });
}

export function disconnectDbAfterTesting() {
  after(() => {
    knex.destroy();
  });
}

export async function useDbForTest() {
  // turn on debug mode
  await prepareDb(before);
  disconnectDbAfterTesting();
}
