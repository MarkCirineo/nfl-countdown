<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import Clock from "@lucide/svelte/icons/clock";

	export let passedClass: string = "";
	export let selectedTime: string = "";
	const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
	const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

	let selectedHour = "00";
	let selectedMinute = "00";

	const updateTime = () => {
		selectedTime = `${selectedHour}:${selectedMinute}`;
	};

	// Handle infinite scrolling
	const handleScroll = (event: Event) => {
		const target = event.target as HTMLElement;
		const scrollHeight = target.scrollHeight / 3; // Total height of one full list
		if (target.scrollTop <= 0) {
			// Scrolled to the top, reset to the bottom of the list
			target.scrollTop = scrollHeight;
		} else if (target.scrollTop >= scrollHeight * 2) {
			// Scrolled to the bottom, reset to the top of the list
			target.scrollTop = scrollHeight;
		}
	};
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class={cn(
					"w-[240px] justify-start text-left font-normal",
					!selectedTime && "text-muted-foreground",
					passedClass
				)}
				{...props}
			>
				<Clock class="mr-1" />
				{selectedHour}:{selectedMinute}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto rounded bg-black p-3 shadow-lg" align="start">
		<div class="flex">
			<div
				class="scrollbar-none flex h-40 w-20 flex-col overflow-y-auto rounded"
				on:scroll={(e) => handleScroll(e)}
			>
				{#each [...hours, ...hours, ...hours] as hour}
					<button
						class="hover:bg-accent rounded px-4 py-2 text-sm text-white"
						on:click={() => {
							selectedHour = hour;
							updateTime();
						}}
					>
						{hour}
					</button>
				{/each}
			</div>
			<div
				class="scrollbar-none flex h-40 w-20 flex-col overflow-y-auto rounded"
				on:scroll={(e) => handleScroll(e)}
			>
				{#each [...minutes, ...minutes, ...minutes] as minute}
					<button
						class="hover:bg-accent rounded px-4 py-2 text-sm text-white"
						on:click={() => {
							selectedMinute = minute;
							updateTime();
						}}
					>
						{minute}
					</button>
				{/each}
			</div>
		</div>
	</Popover.Content>
</Popover.Root>

<style>
	/* Hide scrollbars for all browsers */
	.scrollbar-none::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Edge */
	}
	.scrollbar-none {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
