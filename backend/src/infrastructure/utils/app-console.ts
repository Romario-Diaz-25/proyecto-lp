import { env } from "../config/env/environments";
import { AppDate } from "../lib/app-date";

class AppConsole {
  log(message: string) {
    const prefix = `\x1b[36m [${env.app.name.toUpperCase()}]:\x1b[0m ${new AppDate().toMYSQLDatetime()}`;
    console.log(`${prefix} ::: ${message}`);
  }

  info(message: string) {
    const prefix = `\x1b[33m [${env.app.name.toUpperCase()} INFO]:\x1b[0m ${new AppDate().toMYSQLDatetime()}`;
    console.log(`${prefix} ::: ${message}`);
  }

  error(error: Error) {
    const prefix = `\x1b[31m [${env.app.name.toUpperCase()} ERROR]:\x1b[0m ${new AppDate().toMYSQLDatetime()}`;
    console.error(`${prefix} ::: ${error.message}`);

    if (error.stack) console.error(error.stack);
  }
}

export const appConsole = new AppConsole();
