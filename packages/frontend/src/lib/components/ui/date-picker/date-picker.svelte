<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long"
	});

	let value: DateValue | undefined = undefined;
	export let passedClass: string;
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class={cn(
					"w-[240px] justify-start text-left font-normal",
					passedClass,
					!value && "text-muted-foreground"
				)}
				{...props}
			>
				<CalendarIcon />
				{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar type="single" bind:value />
	</Popover.Content>
</Popover.Root>
