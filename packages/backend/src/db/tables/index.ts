import { Kysely, sql } from "kysely";
import { Database } from "@db";
import logger from "@logger";

export const createTables = async (db: Kysely<Database>): Promise<void> => {
	// Users table
	try {
		await db.schema
			.createTable("users")
			.addColumn("id", "serial", (c) => c.unique().primaryKey())
			.addColumn("username", "varchar(25)", (c) => c.notNull().unique())
			.addColumn("email", "varchar(100)", (c) => c.notNull().unique())
			.addColumn("password", "varchar(64)", (c) => c.notNull())
			.addColumn("role", "varchar(5)", (c) => c.notNull().defaultTo("user"))
			.addColumn("created_at", "timestamptz", (c) => c.notNull().defaultTo(sql`NOW()`))
			.addColumn("updated_at", "timestamptz", (c) => c.notNull().defaultTo(sql`NOW()`))
			.execute();
	} catch (error: any) {
		logger.warn(`Failed to create tables: ${error.message}`);
	}

	// Countdown table
	try {
		await db.schema
			.createTable("countdowns")
			.addColumn("id", "serial", (c) => c.unique().primaryKey())
			.addColumn("created_by", "varchar(25)", (c) => c.notNull())
			.addColumn("title", "varchar(100)", (c) => c.notNull())
			.addColumn("description", "text")
			.addColumn("date", "timestamptz", (c) => c.notNull())
			.addColumn("created_at", "timestamptz", (c) => c.notNull().defaultTo(sql`NOW()`))
			.addColumn("updated_at", "timestamptz", (c) => c.notNull().defaultTo(sql`NOW()`))
			.execute();
	} catch (error: any) {
		logger.warn(`Failed to create tables: ${error.message}`);
	}
};
