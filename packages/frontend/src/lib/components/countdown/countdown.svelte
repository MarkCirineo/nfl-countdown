<script lang="ts">
	import { onDestroy } from "svelte";
	import type { CountdownData } from "$lib/types/countdown";
	import { calculateTimeLeft } from "$lib/utils";

	let { countdown }: { countdown: CountdownData } = $props();

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

<li class="flex min-h-[82px] items-center justify-between rounded border p-4 shadow">
	<div class="flex-1">
		<h2 class="text-lg font-bold">{countdown.title}</h2>
		<p class="text-sm text-gray-500">{countdown.description}</p>
	</div>
	<div class="flex items-center space-x-4">
		{#if countdown.timeLeft}
			<div class="text-center">
				<p class="text-lg font-bold text-blue-500">
					{countdown.timeLeft.days}d {countdown.timeLeft.hours}h {countdown.timeLeft
						.minutes}m
					{countdown.timeLeft.seconds}s
				</p>
			</div>
		{/if}
	</div>
</li>
