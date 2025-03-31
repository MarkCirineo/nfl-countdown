import { Router } from "express";
import db from "@db";
import { HttpError } from "@utils/error";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const countdowns = await db.selectFrom("countdowns").selectAll().execute();

		if (countdowns.length === 0) {
			return res.status(404).send({ message: "No countdowns found" });
		}

		return res.status(200).send(countdowns);
	} catch (error) {
		next(new HttpError("Failed to get countdowns", 500));
	}
});

export default router;
