import "../loadEnvironment";
import mongoose from "mongoose";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("users:database");

const connectDb = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    debug(chalk);
  } catch (error: unknown) {
    debug(
      chalk.bgRed.white(
        `[DATABASE] cannot stablish the connection ${(error as Error).message}`
      )
    );
  }

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ret;
    },
  });
};

export default connectDb;
