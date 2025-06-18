<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import { ModeWatcher } from "mode-watcher";
	import LightSwitch from "$lib/components/ui/light-switch/light-switch.svelte";
	import LogOut from "$lib/components/ui/log-out/log-out.svelte";
	import { getUser, authState } from "$lib/stores/auth.svelte";
	const { VITE_ADSENSE_ID } = import.meta.env;

	let { children } = $props();

	onMount(() => {
		getUser();
	});
</script>

<svelte:head>
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={VITE_ADSENSE_ID}"
		crossorigin="anonymous"
	></script>
</svelte:head>

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
