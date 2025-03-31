export type Countdown = {
	id: number;
	created_by: string;
	title: string;
	description: string;
	created_at: Date;
	updated_at: Date;
	date: string;
};

export type CountdownData = Countdown & {
	timeLeft: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	};
};
