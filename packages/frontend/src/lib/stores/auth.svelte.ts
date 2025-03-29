export const user = $state<{ username: string; role: string }>({ username: "", role: "" });

export const getUser = async () => {
	const res = await fetch("http://localhost:3000/api/auth/me", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.ok) {
		const data = await res.json();
		user.role = data.role;
		user.username = data.username;
	} else {
		user.role = "";
		user.username = "";
	}
};

export const setUser = ({ username, role }: { username: string; role: string }) => {
	user.username = username;
	user.role = role;
};
