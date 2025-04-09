<script lang="ts">
	import { parseDate, type DateValue } from "@internationalized/date";

	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import DatePicker from "$lib/components/ui/date-picker/date-picker.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import TimePicker from "$lib/components/ui/time-picker/time-picker.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

	import { cn } from "$lib/utils";
	import { request } from "$lib/request";
	import type { CountdownData } from "$lib/types/countdown";
	import { getCountdowns } from "$lib/stores/countdown.svelte";

	let { countdown, editing = $bindable() }: { countdown: CountdownData; editing: boolean } =
		$props();

	let date: DateValue | undefined = $state(parseDate(countdown.date.split("T")[0]));
	let time = $state(countdown.date.split("T")[1].slice(0, 5));
	let title = $state(countdown.title);
	let description = $state(countdown.description);

	const cancelEditingCountdown = () => {
		editing = false;
	};

	const editCountdown = async () => {
		if (!date || !time || !title) {
			// TODO: toast?
			return;
		}

		const dateAndTime = `${date.toString()}T${time}:00`;

		// Date validation
		const parsedDate = Date.parse(dateAndTime);
		if (isNaN(parsedDate)) {
			// TODO: toast?
			return;
		}

		const response = await request("/countdown/update", {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: countdown.id,
				date: dateAndTime,
				title,
				description
			})
		});

		if (response.ok) {
			cancelEditingCountdown();
			getCountdowns();
		} else {
			// TODO: handle error
		}
	};
</script>

<div class="mb-4 rounded border p-4 shadow">
	<h2 class="text-lg font-bold">New Countdown</h2>
	<div class="mt-2 space-y-2">
		<Input
			type="text"
			placeholder="Title"
			class="w-full rounded border px-2 py-1"
			bind:value={title}
		/>
		<Textarea
			placeholder="Description"
			class="w-full rounded border px-2 py-1"
			bind:value={description}
		/>
		<div class="flex space-x-2">
			<DatePicker
				passedClass={cn(
					"flex-1 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
				)}
				bind:value={date}
			/>
			<TimePicker
				passedClass={cn(
					"flex-1 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
				)}
				bind:selectedTime={time}
			/>
		</div>
	</div>
	<div class="mt-4 flex space-x-2">
		<Button onclick={cancelEditingCountdown} class="bg-gray-400">Cancel</Button>
		<Button onclick={editCountdown} class="bg-green-500">Save</Button>
	</div>
</div>
