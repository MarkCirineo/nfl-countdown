<script lang="ts">
	import Lock from "@lucide/svelte/icons/lock";
	import LoginForm from "$lib/components/login-form.svelte";

	import { authState } from "$lib/stores/auth.svelte";

	$inspect(authState);
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	{#if authState.loading}
		<p class="text-lg font-bold">Loading...</p>
	{:else if !authState.user.username}
		<LoginForm />
	{:else}
		<div class="text-center">
			{#if authState.user.role !== "admin"}
				<Lock class="mx-auto mb-4 h-14 w-14 text-gray-400" />
				<h2 class="text-xl font-bold">You do not have permission to access this page.</h2>
			{:else}
				<!-- TODO: actual page content -->
			{/if}
		</div>
	{/if}
</div>
