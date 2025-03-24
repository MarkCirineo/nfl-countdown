<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import LightSwitch from "$lib/components/ui/light-switch/light-switch.svelte";

	let { children } = $props();
</script>

<ModeWatcher />

<nav class="nav"><LightSwitch /></nav>

{@render children()}

<style>
	.nav {
		width: 100%;
		padding: 1rem;
		display: flex;
		justify-content: end;
		align-items: center;
	}
</style>
