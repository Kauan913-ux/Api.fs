import * as fs from "fs";

import { User } from "../domain/user";

export class DatabaseJSON {
  private databasePath: string;

  constructor(databasePath: string) {
    this.databasePath = databasePath;
  }

  public query(): User[] {
    const databaseStr = fs.readFileSync(this.databasePath, { encoding: `utf-8` });

    const database = JSON.parse(databaseStr);

    return database;
  }

  public update(user: User): User | null {
    throw new Error('asdoasd')
    const database = this.query();

    const index = database.findIndex((customers) => customers.id === user.id);

    if (index === -1) {
      return null;
    }

    database[index] = user;

    fs.writeFileSync(this.databasePath, JSON.stringify(database, null, 2));

    return user;
  }
}
