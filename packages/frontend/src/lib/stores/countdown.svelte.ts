import { request } from "$lib/request";
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

export const sortCountdowns = () => {
	countdownState.countdownData = countdownState.countdownData.sort((a, b) => {
		const dateA = new Date(a.date).getTime();
		const dateB = new Date(b.date).getTime();
		const now = new Date().getTime();

		const isPastA = dateA < now;
		const isPastB = dateB < now;

		// Future dates come first, sorted in ascending order
		if (!isPastA && isPastB) return -1;
		if (isPastA && !isPastB) return 1;

		// If both are in the future, sort ascending
		if (!isPastA && !isPastB) return dateA - dateB;

		// If both are in the past, sort descending
		return dateB - dateA;
	});
};

export const getCountdowns = async (): Promise<Countdown[]> => {
	const response = await request("/countdown/list", {
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

	// For now just always sort the countdowns when fetching them
	sortCountdowns();

	return countdownState.countdowns;
};
