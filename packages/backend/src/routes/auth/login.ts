import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import db from "@db";
import { HttpError } from "@utils/error";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body;

	try {
		// Get user from db
		const user = await db
			.selectFrom("users")
			.selectAll()
			.where("username", "=", username)
			.executeTakeFirst();

		// Check if the password is correct
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return next(new HttpError("Username or password is incorrect", 404));
		}

		// Create session
		req.session.user = user;

		return res.status(200).send({ message: "Logged in" });
	} catch (error) {
		next(new HttpError("Failed to login", 500));
	}
});

export default router;
