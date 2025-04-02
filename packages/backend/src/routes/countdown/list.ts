import { Router } from "express";
import db from "@db";
import { HttpError } from "@utils/error";
import { Countdown } from "@db/tables/Countdown";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		let countdowns:
			| Countdown[]
			| { id: number; title: string; description: string; date: Date }[] = [];

		if (req.session.user?.role === "admin") {
			countdowns = await db.selectFrom("countdowns").selectAll().execute();
		} else {
			countdowns = await db
				.selectFrom("countdowns")
				.select(["id", "title", "description", "date"])
				.execute();
		}

		if (countdowns.length === 0) {
			return res.status(404).send({ message: "No countdowns found" });
		}

		return res.status(200).send(countdowns);
	} catch (error) {
		next(new HttpError("Failed to get countdowns", 500));
	}
});

export default router;
