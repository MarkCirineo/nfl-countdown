import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { sortCountdowns } from "./stores/countdown.svelte";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const calculateTimeLeft = (targetDate: string) => {
	const now = new Date().getTime();
	const eventTime = new Date(targetDate).getTime();
	const difference = eventTime - now;

	if (difference < 0 && difference > -1000) {
		// If we are between 0 and -1 second, we know it just passed so we sort the countdowns
		sortCountdowns();
		return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
	} else if (difference > 0) {
		// Future date
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);

		return { days, hours, minutes, seconds, isPast: false };
	} else {
		// Past date
		const pastDifference = Math.abs(difference);
		const days = Math.floor(pastDifference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((pastDifference / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((pastDifference / (1000 * 60)) % 60);
		const seconds = Math.floor((pastDifference / 1000) % 60);

		return { days, hours, minutes, seconds, isPast: true };
	}
};
