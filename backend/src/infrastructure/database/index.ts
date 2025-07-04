import { IDatabase, MySQL } from "./mysql/mysql";

class Database {
  db: IDatabase;

  constructor() {
    const { db } = new MySQL();
    this.db = db;
  }
}

export const { db } = new Database();
