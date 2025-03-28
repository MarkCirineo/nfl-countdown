<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import LightSwitch from "$lib/components/ui/light-switch/light-switch.svelte";

	let { children } = $props();
</script>

<ModeWatcher />

<div class="light-switch">
	<LightSwitch />
</div>

{@render children()}

<style>
	.light-switch {
		position: fixed;
		top: 1rem;
		right: 1rem;
	}
</style>
