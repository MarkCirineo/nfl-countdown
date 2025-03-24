import { Generated } from "kysely";

export default interface UserTable {
	id: Generated<number>;
	username: string;
	email: string;
	password: string;
	createdAt: Generated<Date>;
	updatedAt: Generated<Date>;
}

export type User = {
	id: number;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
};
