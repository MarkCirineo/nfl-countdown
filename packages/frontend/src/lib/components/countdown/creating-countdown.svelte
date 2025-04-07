<script lang="ts">
	import { type DateValue } from "@internationalized/date";

	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import DatePicker from "$lib/components/ui/date-picker/date-picker.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import TimePicker from "$lib/components/ui/time-picker/time-picker.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

	import { cn } from "$lib/utils";
	import { getCountdowns } from "$lib/stores/countdown.svelte";

	export let isCreating: boolean = false;

	let date: DateValue | undefined = undefined;
	let time = "";
	let title = "";
	let description = "";

	const resetValues = () => {
		date = undefined;
		time = "";
		title = "";
		description = "";
	};

	const createCountdown = async () => {
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

		const response = await fetch("http://localhost:3000/api/countdown/create", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				date: dateAndTime,
				title,
				description
			})
		});

		if (response.ok) {
			// TODO: toast created countdown
			cancelCreatingCountdown();
			resetValues();
			getCountdowns();
		} else {
			// TODO: handle error
		}
	};

	const cancelCreatingCountdown = () => {
		isCreating = false;
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
		<Button onclick={cancelCreatingCountdown} class="bg-gray-400">Cancel</Button>
		<Button onclick={createCountdown} class="bg-green-500">Save</Button>
	</div>
</div>
