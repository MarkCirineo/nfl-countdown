import "express-session";

declare module "express-session" {
	interface SessionData {
		user?: {
			username: string;
			email: string;
			id: number;
			role: "admin" | "user";
			createdAt: Date;
			updatedAt: Date;
		};
	}
}
