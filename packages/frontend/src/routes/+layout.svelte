<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import { ModeWatcher } from "mode-watcher";
	import LightSwitch from "$lib/components/ui/light-switch/light-switch.svelte";
	import LogOut from "$lib/components/ui/log-out/log-out.svelte";
	import { getUser, authState } from "$lib/stores/auth.svelte";

	let { children } = $props();

	onMount(() => {
		getUser();
	});
</script>

<ModeWatcher />

<div class="options">
	{#if authState.user.username}
		<LogOut />
	{/if}
	<LightSwitch />
</div>

{@render children()}

<style>
	.options {
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: flex;
		gap: 1rem;
	}
</style>
