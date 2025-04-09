<script lang="ts">
	import Eye from "@lucide/svelte/icons/eye";
	import EyeOff from "@lucide/svelte/icons/eye-off";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { setUser } from "$lib/stores/auth.svelte";
	import { request } from "$lib/request.js";

	let username = "";
	let password = "";
	let showPassword = false;

	const handleLogin = async () => {
		const response = await request("/auth/login", {
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

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
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
				<Label for="password">Password</Label>
				<div class="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						bind:value={password}
						required
						class="pr-10"
					/>
					<button
						type="button"
						class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
						onclick={togglePasswordVisibility}
					>
						{#if showPassword}
							<EyeOff class="h-5 w-5" />
						{:else}
							<Eye class="h-5 w-5" />
						{/if}
					</button>
				</div>
			</div>
			<Button type="submit" class="mt-2 w-full" onclick={handleLogin}>Login</Button>
		</div>
	</Card.Content>
</Card.Root>
