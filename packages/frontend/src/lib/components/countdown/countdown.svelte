<script lang="ts">
	import { onDestroy } from "svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { CountdownData } from "$lib/types/countdown";
	import { calculateTimeLeft } from "$lib/utils";

	let { countdown }: { countdown: CountdownData } = $props();

	const editCountdown = (id: number) => {
		// Placeholder for editing a countdown
	};

	const deleteCountdown = (id: number) => {
		// Placeholder for deleting a countdown
	};

	// Update countdowns every second
	const interval = setInterval(() => {
		countdown = {
			...countdown,
			timeLeft: calculateTimeLeft(countdown.date)
		};
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<li class="flex items-center justify-between rounded border p-4 shadow">
	<div class="flex-1">
		<h2 class="text-lg font-bold">{countdown.title}</h2>
		<p class="text-sm text-gray-500">{countdown.description}</p>
		<p class="text-sm text-gray-500">Date: {countdown.date}</p>
		<p class="text-sm text-gray-500">
			Created By: {countdown.created_by}
		</p>
	</div>
	<div class="flex items-center space-x-4">
		<!-- Live Countdown -->
		{#if countdown.timeLeft}
			<div class="text-center">
				<p class="text-md font-bold text-blue-500">
					{countdown.timeLeft.days}d {countdown.timeLeft.hours}h {countdown.timeLeft
						.minutes}m
					{countdown.timeLeft.seconds}s
				</p>
			</div>
		{/if}
		<div class="flex space-x-2">
			<Button onclick={() => editCountdown(countdown.id)}>Edit</Button>
			<Button onclick={() => deleteCountdown(countdown.id)} class="bg-red-500">Delete</Button>
		</div>
	</div>
</li>
