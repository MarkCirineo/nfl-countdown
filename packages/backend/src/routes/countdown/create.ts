import { Router } from "express";
import { isAdmin } from "@middleware/auth";
import { HttpError } from "@utils/error";
import db from "@db";

const router = Router();

router.post("/", isAdmin, async (req, res, next) => {
	try {
		const { title, date, description } = req.body;

		if (!title || !date) {
			return next(new HttpError("Title and date are required", 400));
		}

		// Date validation
		const parsedDate = Date.parse(date);
		if (isNaN(parsedDate)) {
			return next(new HttpError("Invalid date format", 400));
		}

		const countdown = await db
			.insertInto("countdowns")
			.values({
				title,
				date,
				description: description ?? "",
				// @ts-ignore - isAdmin middleware will verify if req.session.user exists
				created_by: req.session.user.username
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return res.status(201).send({ message: "Countdown created", data: countdown });
	} catch (error) {
		return next(new HttpError("Failed to create countdown", 500));
	}
});

export default router;
