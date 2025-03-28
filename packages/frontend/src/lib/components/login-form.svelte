<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="mb-1 grid gap-4">
			<div class="grid gap-2">
				<Label for="username">Username</Label>
				<Input id="username" type="text" required />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
				</div>
				<Input id="password" type="password" required />
			</div>
			<Button type="submit" class="mt-2 w-full">Login</Button>
		</div>
	</Card.Content>
</Card.Root>
