import { sqliteConnection } from "..";
import { tableTasks } from "./tableTasks";
import { tableUsers } from "./tableUsers";

export async function runMigrations() {
  const schemas = [tableUsers, tableTasks].join("");

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error("Migration Error - ", error));
}
