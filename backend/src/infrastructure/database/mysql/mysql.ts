import knex, { Knex } from "knex";
import { env } from "../../config/env/environments";
import { appConsole } from "../../utils/app-console";

export interface IDatabase extends Knex {}
export interface ITable extends Knex.CreateTableBuilder {}
export interface IColumn extends Knex.ColumnBuilder {}
export type TLengthOperator = Knex.lengthOperator;

export interface SQLError {
  code: string;
  errno: number;
  sqlState: string;
  sqlMessage: string;
  sql: string;
}

export class MySQL {
  public db: IDatabase;

  constructor() {
    this.db = knex({
      client: "mysql2",
      connection: {
        host: env.db.mysql.host,
        user: env.db.mysql.user,
        port: Number(env.db.mysql.port),
        password: env.db.mysql.pass,
        database: env.db.mysql.name,
      },
      pool: env.db.mysql.pool,
    });

    this.testConnection();
  }

  testConnection(): void {
    appConsole.log("Connecting to MySQL...");

    this.db
      .raw("SELECT 1+1 as result")
      .then(([[{ result }]]) => {
        appConsole.log(`MySQL write database connected, Result: ${result}`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
