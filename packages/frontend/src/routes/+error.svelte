<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/components/ui/button/button.svelte";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";

	const errorMessage = page?.error?.message ?? "An unexpected error occurred.";

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="overflow flex h-screen w-full flex-col items-center justify-center gap-4">
	<h1 class="text-xl font-bold">{errorMessage}</h1>
	{#if errorMessage === "Not Found"}
		<Button onclick={goBack}><ArrowLeft />Go Back</Button>
	{/if}
</div>
