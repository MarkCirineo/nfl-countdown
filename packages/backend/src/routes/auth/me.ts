import { Router } from "express";
import db from "@db";
import { HttpError } from "@utils/error";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		if (!req.session.user) {
			return next(new HttpError("Not logged in", 401));
		}

		const { username } = req.session.user;

		const user = await db
			.selectFrom("users")
			.selectAll()
			.where("username", "=", username)
			.executeTakeFirstOrThrow();

		return res.status(200).send({
			username: user.username,
			role: user.role
		});
	} catch (error) {
		return next(new HttpError("Failed to get user", 500));
	}
});

export default router;
