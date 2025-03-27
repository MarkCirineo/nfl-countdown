import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import db from "@db";
import { HttpError } from "@utils/error";

const router = Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
	const { username, email, password } = req.body;

	try {
		// Check if the username is already taken
		const userExists = await db.selectFrom("users").where("username", "=", username).execute();

		if (userExists.length > 0) {
			return next(new HttpError("Username is already taken", 400));
		}

		// Check if the email is already taken
		const emailExists = await db.selectFrom("users").where("email", "=", email).execute();

		if (emailExists.length > 0) {
			return next(new HttpError("Email is already taken", 400));
		}

		// Password validation
		if (password.length <= 8) {
			return next(new HttpError("Password must be at least 8 characters long", 400));
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Save the user to the database
		await db
			.insertInto("users")
			.values({
				username,
				email,
				role: "user",
				password: hashedPassword
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return res.status(201).send({ message: "User created" });
	} catch (error) {
		next(new HttpError("Failed to create user", 500));
	}
});

export default router;
