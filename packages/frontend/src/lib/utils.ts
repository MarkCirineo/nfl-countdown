import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const calculateTimeLeft = (targetDate: string) => {
	const now = new Date().getTime();
	const eventTime = new Date(targetDate).getTime();
	const difference = eventTime - now;

	if (difference <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((difference / (1000 * 60)) % 60);
	const seconds = Math.floor((difference / 1000) % 60);

	return { days, hours, minutes, seconds };
};
