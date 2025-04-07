<script lang="ts">
	import Lock from "@lucide/svelte/icons/lock";
	import LoginForm from "$lib/components/login-form.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import Countdowns from "$lib/components/countdown/countdowns.svelte";
	import CreatingCountdown from "$lib/components/countdown/creating-countdown.svelte";

	import { authState } from "$lib/stores/auth.svelte";

	let isCreating = false;

	const startCreatingCountdown = () => {
		isCreating = true;
	};
</script>

{#if authState.loading}
	<div class="overflow flex h-screen w-full flex-col items-center justify-center">
		<p class="text-lg font-bold">Loading...</p>
	</div>
{:else if !authState.user.username}
	<div class="overflow flex h-screen w-full flex-col items-center justify-center">
		<LoginForm />
	</div>
{:else if authState.user.role !== "admin"}
	<div class="overflow flex h-screen w-full flex-col items-center justify-center">
		<div class="w-full max-w-4xl py-12">
			<div class="text-center">
				<Lock class="mx-auto mb-4 h-14 w-14 text-gray-400" />
				<h2 class="text-xl font-bold">You do not have permission to access this page.</h2>
			</div>
		</div>
	</div>
{:else}
	<div class="overflow flex h-screen w-full flex-col items-center justify-start">
		<div class="w-full max-w-4xl py-12">
			<div class="top-0 z-10 text-center">
				<h1 class="mb-6 text-2xl font-bold">Welcome, {authState.user.username}!</h1>
				<div class="mb-10">
					<Button onclick={startCreatingCountdown}>Create New Countdown</Button>
				</div>
			</div>
			<div class="overflow-y-auto">
				{#if isCreating}
					<CreatingCountdown bind:isCreating />
				{/if}
				<Countdowns showAdminOptions={true} />
			</div>
		</div>
	</div>
{/if}
