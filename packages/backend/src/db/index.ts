import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import config from "@config.js";
import UserTable from "@db/tables/User.js";
import CountdownTable from "@db/tables/Countdown";
import { createTables } from "./tables";

const { Pool } = pg;

export interface Database {
	users: UserTable;
	countdowns: CountdownTable;
}

const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: config.db.connectionString
		})
	})
});

await createTables(db);

export default db;
