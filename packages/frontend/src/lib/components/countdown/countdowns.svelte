<script lang="ts">
	import { onMount } from "svelte";

	import { countdownState, getCountdowns } from "$lib/stores/countdown.svelte";
	import { authState } from "$lib/stores/auth.svelte";
	import Countdown from "$lib/components/countdown/countdown.svelte";

	onMount(async () => {
		await getCountdowns();
	});
</script>

<ul class="space-y-4">
	{#each countdownState.countdownData as countdown}
		<Countdown {countdown} isAdmin={authState.user.role === "admin"} />
	{/each}
</ul>
