<script lang="ts">
	import LogOut from "@lucide/svelte/icons/log-out";
	import { Button } from "$lib/components/ui/button/index.js";

	const logOut = async () => {
		const response = await fetch("http://localhost:3000/api/auth/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			window.location.reload();
		} else {
			// TODO: handle error
		}
	};
</script>

<Button onclick={logOut} variant="outline" size="icon">
	<LogOut />
	<span class="sr-only">Toggle theme</span>
</Button>
