import { Generated } from "kysely";

export default interface CountdownTable {
	id: Generated<number>;
	createdBy: string;
	title: string;
	description: string;
	date: Date;
	createdAt: Generated<Date>;
	updatedAt: Generated<Date>;
}

export type Countdown = {
	id: number;
	createdBy: string;
	title: string;
	description: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
};
