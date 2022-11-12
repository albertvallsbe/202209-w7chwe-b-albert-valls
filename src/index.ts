import environment from "./loadEnvironment.js";
import debugCreator from "debug";
import chalk from "chalk";
import app from "./server/app.js";
import startServer from "./server/startServer.js";
import connectDb from "./database/connectDb.js";

const debug = debugCreator("social:root");

const { port, mongoDbUrl } = environment;

try {
  await startServer(app, +port);
  debug(chalk.bgBlueBright.white(`Server is listening on http://:${port}`));
  await connectDb(mongoDbUrl);
  debug(chalk.bgGreen.white(`Database connection Ok!`));
} catch (error: unknown) {
  debug(
    chalk.bgRed.yellow(`Error starting the API: `, (error as Error).message)
  );
}
