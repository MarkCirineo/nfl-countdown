<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { setUser } from "$lib/stores/auth.svelte";

	let username = "";
	let password = "";

	const handleLogin = async () => {
		const response = await fetch("http://localhost:3000/api/auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, password })
		});

		const { data } = await response.json();

		if (response.ok) {
			clearInputs();

			setUser({
				username: data.username,
				role: data.role
			});
		} else {
			console.error(data);
			// TODO: handle error
		}
	};

	const clearInputs = () => {
		username = "";
		password = "";
	};
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="mb-1 grid gap-4">
			<div class="grid gap-2">
				<Label for="username">Username</Label>
				<Input id="username" type="text" bind:value={username} required />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
				</div>
				<Input id="password" type="password" bind:value={password} required />
			</div>
			<Button type="submit" class="mt-2 w-full" onclick={handleLogin}>Login</Button>
		</div>
	</Card.Content>
</Card.Root>
