<script lang="ts">
	import { onMount } from "svelte";

	import { countdownState, getCountdowns } from "$lib/stores/countdown.svelte";
	import { authState } from "$lib/stores/auth.svelte";
	import Countdown from "$lib/components/countdown/countdown.svelte";
	import AdminCountdown from "./admin-countdown.svelte";

	onMount(async () => {
		await getCountdowns();
	});
</script>

<ul class="space-y-4">
	{#each countdownState.countdownData as countdown}
		{#if authState.user.role === "admin"}
			<AdminCountdown {countdown} />
		{:else}
			<Countdown {countdown} />
		{/if}
	{/each}
</ul>
