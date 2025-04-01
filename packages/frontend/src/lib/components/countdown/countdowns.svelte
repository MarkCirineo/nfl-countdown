<script lang="ts">
	import { onMount } from "svelte";

	import Countdown from "./countdown.svelte";
	import { countdownState, fetchCountdowns } from "$lib/stores/countdown.svelte";

	onMount(async () => {
		await fetchCountdowns();
	});
</script>

<ul class="space-y-4">
	{#each countdownState.countdownData as countdown}
		<Countdown {countdown} />
	{/each}
</ul>
