<script lang="ts">
	import { onDestroy } from "svelte";

	import Button from "$lib/components/ui/button/button.svelte";

	import type { CountdownData } from "$lib/types/countdown";
	import { calculateTimeLeft, cn } from "$lib/utils";
	import { request } from "$lib/request";
	import { getCountdowns } from "$lib/stores/countdown.svelte";
	import EditingCountdown from "./editing-countdown.svelte";

	let { countdown, isAdmin }: { countdown: CountdownData; isAdmin: boolean } = $props();

	let editing = $state(false);

	const deleteCountdown = async (id: number) => {
		const response = await request("/countdown/delete", {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		});

		if (response.ok) {
			// TODO: toast
			getCountdowns();
		} else {
			// TODO: toast
			console.error("Failed to delete countdown");
		}
	};

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

{#if editing}
	<EditingCountdown bind:editing {countdown} />
{:else}
	<li
		class={cn(
			"flex min-h-[82px] items-center justify-between rounded border p-4 shadow",
			countdown.timeLeft.isPast &&
				"bg-gray-100 text-gray-500 opacity-85 dark:bg-gray-900 dark:text-gray-600"
		)}
	>
		<div class="flex-1">
			<h2 class="text-lg font-bold">{countdown.title}</h2>
			<p class={cn("text-sm text-gray-400", countdown.timeLeft.isPast && "text-gray-500")}>
				{countdown.description}
			</p>
			{#if isAdmin}
				<p
					class={cn(
						"text-sm text-gray-400",
						countdown.timeLeft.isPast && "text-gray-500"
					)}
				>
					Date: {countdown.date}
				</p>
				<p
					class={cn(
						"text-sm text-gray-400",
						countdown.timeLeft.isPast && "text-gray-500"
					)}
				>
					Created By: {countdown.created_by}
				</p>
			{/if}
		</div>
		<div class="flex items-center space-x-4">
			{#if countdown.timeLeft}
				<div class="text-center">
					{#if countdown.timeLeft.isPast}
						<p class="text-lg font-bold">
							{countdown.timeLeft.days}d {countdown.timeLeft.hours}h {countdown
								.timeLeft.minutes}m {countdown.timeLeft.seconds}s ago
						</p>
					{:else}
						<p class="text-lg font-bold text-blue-500">
							{countdown.timeLeft.days}d {countdown.timeLeft.hours}h {countdown
								.timeLeft.minutes}m {countdown.timeLeft.seconds}s
						</p>
					{/if}
				</div>
			{/if}
			{#if isAdmin}
				<div class="flex space-x-2">
					<Button onclick={() => (editing = true)}>Edit</Button>
					<Button onclick={() => deleteCountdown(countdown.id)} class="bg-red-500"
						>Delete</Button
					>
				</div>
			{/if}
		</div>
	</li>
{/if}
