const API_URL = import.meta.env.VITE_API_URL;

/**
 * @param {string} url - Must have leading slash (e.g. /auth/login)
 */
export const request = async (url: string, options?: RequestInit): Promise<Response> => {
	const response = await fetch(`${API_URL}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers
		}
	});

	return response;
};
