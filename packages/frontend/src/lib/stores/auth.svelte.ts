import { request } from "$lib/request";

type AuthState = {
	user: {
		username: string;
		role: string;
	};
	loading: boolean;
};

export const authState = $state<AuthState>({
	user: {
		username: "",
		role: ""
	},
	loading: true
});

export const getUser = async () => {
	authState.loading = true;

	const res = await request("/auth/me", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.ok) {
		const data = await res.json();
		authState.user.role = data.role;
		authState.user.username = data.username;
	} else {
		authState.user.role = "";
		authState.user.username = "";
	}

	authState.loading = false;
};

export const setUser = ({ username, role }: { username: string; role: string }) => {
	authState.user.username = username;
	authState.user.role = role;
};
