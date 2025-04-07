import db from "@db";
import { isAdmin } from "@middleware/auth";
import { HttpError } from "@utils/error";
import { Router } from "express";

const router = Router();

router.put("/", isAdmin, async (req, res, next) => {
	try {
		const { id, title, date, description } = req.body;

		const countdown = await db
			.selectFrom("countdowns")
			.where("id", "=", +id)
			.selectAll()
			.executeTakeFirstOrThrow();

		// Date validation
		const parsedDate = Date.parse(date);
		if (isNaN(parsedDate)) {
			return next(new HttpError("Invalid date format", 400));
		}

		const newTitle = title || countdown.title;
		const newDate = date || countdown.date;
		const newDescription = description || countdown.description;

		const updatedCountdown = await db
			.updateTable("countdowns")
			.set({ title: newTitle, date: newDate, description: newDescription })
			.where("id", "=", +id)
			.returningAll()
			.executeTakeFirstOrThrow();

		if (!updatedCountdown) {
			return res.status(404).json({ message: "Countdown not found" });
		}

		res.status(200).send({
			message: "Countdown updated successfully",
			countdown: updatedCountdown
		});
	} catch (error) {
		next(new HttpError("Failed to update countdown", 500));
	}
});

export default router;
