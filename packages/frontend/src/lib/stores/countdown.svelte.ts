import type { Countdown, CountdownData } from "$lib/types/countdown";
import { calculateTimeLeft } from "$lib/utils";

type CountdownState = {
	countdowns: Countdown[];
	countdownData: CountdownData[];
};

export const countdownState = $state<CountdownState>({
	countdowns: [],
	countdownData: []
});

export const fetchCountdowns = async (): Promise<Countdown[]> => {
	const response = await fetch("http://localhost:3000/api/countdown/list", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to fetch countdowns");
	}

	countdownState.countdowns = await response.json();
	countdownState.countdownData = countdownState.countdowns.map((countdown) => ({
		...countdown,
		timeLeft: calculateTimeLeft(countdown.date)
	}));

	return countdownState.countdowns;
};
