<script lang="ts">
	import { onMount } from "svelte";

	import type { Countdown as CountdownType, CountdownData } from "$lib/types/countdown";
	import Countdown from "./countdown.svelte";
	import { calculateTimeLeft } from "$lib/utils";

	const fetchCountdowns = async (): Promise<CountdownType[]> => {
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

		return await response.json();
	};

	let countdownData: CountdownData[] = [];

	onMount(async () => {
		countdownData = (await fetchCountdowns()).map((countdown) => ({
			...countdown,
			timeLeft: calculateTimeLeft(countdown.date)
		}));
	});
</script>

<ul class="space-y-4">
	{#each countdownData as countdown}
		<Countdown {countdown} />
	{/each}
</ul>
