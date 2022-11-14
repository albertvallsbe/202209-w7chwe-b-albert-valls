import "./loadEnvironment.js";

import environment from "./loadEnvironment.js";
import debugCreator from "debug";
import chalk from "chalk";
import app from "./server/app.js";
import startServer from "./server/startServer.js";
import connectDb from "./database/connectDb.js";

const debug = debugCreator("api:social:root");

const { port, mongoDbUrl } = environment;

try {
  await connectDb(mongoDbUrl);
  debug(chalk.bgGreen.white(`Database connection Ok!`));
  await startServer(app, +port);
  debug(chalk.bgBlueBright.white(`Server is listening on http://:${port}`));
} catch (error: unknown) {
  debug(
    chalk.bgRed.yellow(`Error starting the API: `, (error as Error).message)
  );
}
